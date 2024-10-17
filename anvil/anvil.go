package anvil

import (
	"bufio"
	"context"
	"errors"
	"fmt"
	"io"
	"math/big"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"sync/atomic"

	"github.com/ethereum-optimism/supersim/config"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/log"
	"github.com/ethereum/go-ethereum/rpc"
)

var (
	_ config.Chain = &Anvil{}

	logTracerParams = map[string]interface{}{
		"tracer": "callTracer",
		"tracerConfig": map[string]interface{}{
			"withLog": true,
		},
	}
)

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
	closeApp       context.CancelCauseFunc

	stopped   atomic.Bool
	stoppedCh chan struct{}
}

func New(log log.Logger, closeApp context.CancelCauseFunc, cfg *config.ChainConfig) *Anvil {
	resCtx, resCancel := context.WithCancel(context.Background())
	return &Anvil{
		log:            log,
		cfg:            cfg,
		resourceCtx:    resCtx,
		resourceCancel: resCancel,
		closeApp:       closeApp,
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
		"--max-persisted-states", "5",
	}

	if a.cfg.L2Config != nil {
		args = append(args, "--optimism")
	}
	if a.cfg.StartingTimestamp > 0 {
		args = append(args, "--timestamp", fmt.Sprintf("%d", a.cfg.StartingTimestamp))
	}

	if len(a.cfg.GenesisJSON) > 0 && a.cfg.ForkConfig == nil {
		tempFile, err := os.CreateTemp("", "genesis-*.json")
		defer a.removeFile(tempFile)

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

	var logFile *os.File

	// Empty LogsDirectory defaults to temp file
	if a.cfg.LogsDirectory == "" {
		tempLogFile, err := os.CreateTemp("", fmt.Sprintf("anvil-chain-%d-", a.cfg.ChainID))
		if err != nil {
			return fmt.Errorf("failed to create temp log file: %w", err)
		}

		logFile = tempLogFile
		// Clean up the temp log file
		// TODO (https://github.com/ethereum-optimism/supersim/issues/205) This results in the temp file being deleted right away instead of after shutdown.
		defer a.removeFile(logFile)
	} else {
		// Expand the path to the log file
		absFilePath, err := filepath.Abs(fmt.Sprintf("%s/anvil-%d.log", a.cfg.LogsDirectory, a.cfg.ChainID))
		if err != nil {
			return fmt.Errorf("failed to expand path: %w", err)
		}

		// Handle logs in the specified directory
		specifiedLogFile, err := os.Create(absFilePath)
		if err != nil {
			return fmt.Errorf("failed to create log file: %w", err)
		}
		logFile = specifiedLogFile
		// Don't delete the log file if directory is specified
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

		// If anvil stops, signal that the entire app should be closed
		a.closeApp(nil)
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

func (a *Anvil) Stop(_ context.Context) error {
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

func (a *Anvil) EthClient() *ethclient.Client {
	return a.ethClient
}

func (a *Anvil) SetCode(ctx context.Context, result interface{}, address common.Address, code string) error {
	return a.rpcClient.CallContext(ctx, result, "anvil_setCode", address.Hex(), code)
}

func (a *Anvil) SetStorageAt(ctx context.Context, result interface{}, address common.Address, storageSlot string, storageValue string) error {
	return a.rpcClient.CallContext(ctx, result, "anvil_setStorageAt", address.Hex(), storageSlot, storageValue)
}

func (a *Anvil) SetBalance(ctx context.Context, result interface{}, address common.Address, value *big.Int) error {
	return a.rpcClient.CallContext(ctx, result, "anvil_setBalance", address.Hex(), hexutil.EncodeBig(value))
}

func (a *Anvil) SetIntervalMining(ctx context.Context, result interface{}, interval int64) error {
	return a.rpcClient.CallContext(ctx, result, "evm_setIntervalMining", interval)
}

// DebugTraceCall internal types
type txArgs struct {
	From     common.Address  `json:"from"`
	To       *common.Address `json:"to"`
	Gas      hexutil.Uint64  `json:"gas"`
	GasPrice *hexutil.Big    `json:"gasPrice"`
	Data     hexutil.Bytes   `json:"data"`
	Value    *hexutil.Big    `json:"value"`
}
type callFrame struct {
	Logs  []callLog   `json:"logs"`
	Calls []callFrame `json:"calls"`
}
type callLog struct {
	Address common.Address `json:"address"`
	Topics  []common.Hash  `json:"topics"`
	Data    hexutil.Bytes  `json:"data"`
}

func (a *Anvil) SimulatedLogs(ctx context.Context, tx *types.Transaction) ([]types.Log, error) {
	from, err := types.Sender(types.LatestSignerForChainID(tx.ChainId()), tx)
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve tx sender: %w", err)
	}

	txArgs := txArgs{From: from, To: tx.To(), Gas: hexutil.Uint64(tx.Gas()), GasPrice: (*hexutil.Big)(tx.GasPrice()), Data: tx.Data(), Value: (*hexutil.Big)(tx.Value())}
	result := callFrame{}
	if err = a.rpcClient.CallContext(ctx, &result, "debug_traceCall", txArgs, "latest", logTracerParams); err != nil {
		return nil, err
	}

	// aggregate all logs from the top-level and nested calls
	logs, stack := []types.Log{}, []callFrame{result}
	for len(stack) > 0 {
		call := stack[0]
		stack = stack[1:]
		for _, log := range call.Logs {
			logs = append(logs, types.Log{Address: log.Address, Topics: log.Topics, Data: log.Data})
		}
		stack = append(stack, call.Calls...)
	}

	return logs, err
}

func (a *Anvil) removeFile(file *os.File) {
	if err := os.Remove(file.Name()); err != nil {
		a.log.Warn("failed to remove temp genesis file", "file.path", file.Name(), "err", err)
	}
}
