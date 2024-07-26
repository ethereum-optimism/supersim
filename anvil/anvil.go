package anvil

import (
	"bufio"
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"sync/atomic"
	"time"

	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"
)

var _ config.Chain = &Anvil{}

const (
	host                 = "127.0.0.1"
	anvilListeningLogStr = "Listening on"
)

type Anvil struct {
	rpcClient *rpc.Client

	ethClient *ethclient.Client

	log         log.Logger
	logFilePath string

	cfg *config.ChainConfig
	cmd *exec.Cmd

	resourceCtx    context.Context
	resourceCancel context.CancelFunc

	stopped   atomic.Bool
	stoppedCh chan struct{}
}

func New(log log.Logger, cfg *config.ChainConfig) *Anvil {
	resCtx, resCancel := context.WithCancel(context.Background())
	return &Anvil{
		log:            log,
		cfg:            cfg,
		resourceCtx:    resCtx,
		resourceCancel: resCancel,
		stoppedCh:      make(chan struct{}, 1),
	}
}

func (a *Anvil) Start(ctx context.Context) error {
	if a.cmd != nil {
		return errors.New("anvil already started")
	}

	args := []string{
		"--host", host,
		"--accounts", fmt.Sprintf("%d", a.cfg.SecretsConfig.Accounts),
		"--mnemonic", a.cfg.SecretsConfig.Mnemonic,
		"--derivation-path", a.cfg.SecretsConfig.DerivationPath.String(),
		"--chain-id", fmt.Sprintf("%d", a.cfg.ChainID),
		"--port", fmt.Sprintf("%d", a.cfg.Port),
		"--optimism",
	}

	if len(a.cfg.GenesisJSON) > 0 && a.cfg.ForkConfig == nil {
		tempFile, err := os.CreateTemp("", "genesis-*.json")
		if err != nil {
			return fmt.Errorf("error creating temporary genesis file: %w", err)
		}
		if _, err = tempFile.Write(a.cfg.GenesisJSON); err != nil {
			return fmt.Errorf("error writing to genesis file: %w", err)
		}
		args = append(args, "--init", tempFile.Name())
	}
	if a.cfg.ForkConfig != nil {
		args = append(args,
			"--fork-url", a.cfg.ForkConfig.RPCUrl,
			"--fork-block-number", fmt.Sprintf("%d", a.cfg.ForkConfig.BlockNumber))
	}

	anvilLog := a.log.New("role", "anvil", "name", a.cfg.Name, "chain.id", a.cfg.ChainID)
	anvilLog.Debug("generated cmd arguments", "args", args)

	a.cmd = exec.CommandContext(a.resourceCtx, "anvil", args...)
	go func() {
		<-ctx.Done()
		a.resourceCancel()
	}()

	// In the event anvil is started with port 0, we'll need to block
	// and see what port anvil eventually binds to when started
	anvilPortCh := make(chan uint64)

	// Handle stdout/stderr
	logFile, err := os.CreateTemp("", fmt.Sprintf("anvil-chain-%d-", a.cfg.ChainID))
	if err != nil {
		return fmt.Errorf("failed to create temp log file: %w", err)
	}

	a.logFilePath = logFile.Name()
	anvilLog.Debug("piping logs to file", "file.path", a.logFilePath)

	stdout, err := a.cmd.StdoutPipe()
	if err != nil {
		return fmt.Errorf("failed to get handle on stdout: %w", err)
	}
	stderr, err := a.cmd.StderrPipe()
	if err != nil {
		return fmt.Errorf("failed to get handle on stderr: %w", err)
	}
	go func() {
		scanner := bufio.NewScanner(stdout)
		for scanner.Scan() {
			txt := scanner.Text()
			if _, err := fmt.Fprintln(logFile, txt); err != nil {
				anvilLog.Warn("err piping stdout to log file", "err", err)
			}

			// extract the port from the log
			if strings.HasPrefix(txt, anvilListeningLogStr) {
				port, err := strconv.ParseInt(strings.Split(txt, ":")[1], 10, 64)
				if err != nil {
					panic(fmt.Errorf("unexpected anvil listening port log: %w", err))
				}
				anvilPortCh <- uint64(port)
			}
		}
	}()
	go func() {
		if _, err := io.Copy(logFile, stderr); err != nil {
			anvilLog.Warn("err piping stderr to log file", "err", err)
		}
	}()

	// Start anvil
	anvilLog.Debug("starting anvil")
	if err := a.cmd.Start(); err != nil {
		return fmt.Errorf("failed to start anvil: %w", err)
	}

	go func() {
		if err := a.cmd.Wait(); err != nil {
			anvilLog.Error("anvil terminated with an error", "error", err)
		} else {
			anvilLog.Debug("anvil terminated")
		}

		a.stoppedCh <- struct{}{}
	}()

	// wait & update the port. Since we're in the same routine to which `Start` is called,
	// we're safe to overrwrite the `Port` field which the caller can observe. The update
	// should be a no-op if bound to an explicit non-zero port
	done := ctx.Done()
	select {
	case a.cfg.Port = <-anvilPortCh:
	case <-done:
		return ctx.Err()
	}

	rpcClient, err := rpc.Dial(a.wsEndpoint())
	if err != nil {
		return fmt.Errorf("failed to create RPC client: %w", err)
	}
	a.rpcClient = rpcClient
	a.ethClient = ethclient.NewClient(rpcClient)
	return nil
}

func (a *Anvil) Stop() error {
	if a.stopped.Load() {
		return errors.New("already stopped")
	}
	if !a.stopped.CompareAndSwap(false, true) {
		return nil // someone else stopped
	}

	a.rpcClient.Close()
	a.resourceCancel()
	<-a.stoppedCh
	return nil
}

func (a *Anvil) Stopped() bool {
	return a.stopped.Load()
}

func (a *Anvil) Endpoint() string {
	return fmt.Sprintf("http://%s:%d", host, a.cfg.Port)
}

func (a *Anvil) wsEndpoint() string {
	return fmt.Sprintf("ws://%s:%d", host, a.cfg.Port)
}

func (a *Anvil) Name() string {
	return a.cfg.Name
}

func (a *Anvil) ChainID() uint64 {
	return a.cfg.ChainID
}

func (a *Anvil) LogPath() string {
	return a.logFilePath
}

func (a *Anvil) Config() *config.ChainConfig {
	return a.cfg
}

func (a *Anvil) WaitUntilReady(ctx context.Context) error {
	timeoutCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return fmt.Errorf("context cancelled")
		case <-timeoutCtx.Done():
			return fmt.Errorf("timed out waiting for response from client")
		case <-ticker.C:
			var result string
			result, err := a.Web3ClientVersion(ctx)

			if err != nil {
				continue
			}
			if strings.HasPrefix(result, "anvil") {
				return nil
			}

			return fmt.Errorf("unexpected client version: %s", result)
		}
	}
}

func (a *Anvil) String() string {
	var b strings.Builder
	fmt.Fprintf(&b, "Name: %s    Chain ID: %d    RPC: %s    LogPath: %s", a.Name(), a.ChainID(), a.Endpoint(), a.LogPath())
	return b.String()
}

func (a *Anvil) EthClient() *ethclient.Client {
	return a.ethClient
}

// web3_ API
func (a *Anvil) Web3ClientVersion(ctx context.Context) (string, error) {
	var result string
	if err := a.rpcClient.CallContext(ctx, &result, "web3_clientVersion"); err != nil {
		return "", err
	}
	return result, nil
}

// eth_ API
func (a *Anvil) EthGetCode(ctx context.Context, account common.Address) ([]byte, error) {
	return a.ethClient.CodeAt(ctx, account, nil)
}

func (a *Anvil) EthGetLogs(ctx context.Context, q ethereum.FilterQuery) ([]types.Log, error) {
	return a.ethClient.FilterLogs(ctx, q)
}

func (a *Anvil) EthSendTransaction(ctx context.Context, tx *types.Transaction) error {
	return a.ethClient.SendTransaction(ctx, tx)
}

// subscription API
func (a *Anvil) SubscribeFilterLogs(ctx context.Context, q ethereum.FilterQuery, ch chan<- types.Log) (ethereum.Subscription, error) {
	return a.ethClient.SubscribeFilterLogs(ctx, q, ch)
}
