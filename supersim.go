package supersim

import (
	"fmt"
	"strings"

	"context"

	registry "github.com/ethereum-optimism/superchain-registry/superchain"
	"github.com/ethereum-optimism/supersim/config"
	"github.com/ethereum-optimism/supersim/hdaccount"
	"github.com/ethereum-optimism/supersim/orchestrator"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/log"
)

var (
	DefaultAccounts       uint64                  = 10
	DefaultMnemonic       string                  = "test test test test test test test test test test test junk"
	DefaultDerivationPath accounts.DerivationPath = accounts.DefaultRootDerivationPath
)

type Supersim struct {
	log            log.Logger
	hdAccountStore *hdaccount.HdAccountStore

	Orchestrator *orchestrator.Orchestrator
}

func NewSupersim(log log.Logger, config *config.CLIConfig) (*Supersim, error) {
	hdAccountStore, err := hdaccount.NewHdAccountStore(DefaultMnemonic, DefaultDerivationPath)
	if err != nil {
		return nil, fmt.Errorf("failed to create HD account store")
	}

	oConfig := orchestrator.DefaultConfig
	if config.ForkConfig != nil {
		superchain := registry.Superchains[config.ForkConfig.Network]
		log.Info("generating fork configuration", "superchain", superchain.Superchain)

		oConfig, err = orchestrator.ConfigFromForkCLIConfig(config.ForkConfig)
		if err != nil {
			return nil, fmt.Errorf("failed to construct fork configuration: %w", err)
		}

		// log generated configuration
		for _, chainCfg := range oConfig.ChainConfigs {
			var name string
			if chainCfg.ChainID == superchain.Config.L1.ChainID {
				name = superchain.Superchain
			} else {
				name = registry.OPChains[chainCfg.ChainID].Chain
			}
			log.Info("fork configuration", "name", name, "chain.id", chainCfg.ChainID, "fork.height", chainCfg.ForkConfig.BlockNumber)
		}
	}

	o, err := orchestrator.NewOrchestrator(log, oConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create orchestrator")
	}

	return &Supersim{log, hdAccountStore, o}, nil
}

func (s *Supersim) Start(ctx context.Context) error {
	s.log.Info("starting supersim")

	if err := s.Orchestrator.Start(ctx); err != nil {
		return fmt.Errorf("orchestrator failed to start: %w", err)
	}

	s.log.Info("supersim is ready")
	s.log.Info(s.ConfigAsString())

	return nil
}

func (s *Supersim) Stop(ctx context.Context) error {
	s.log.Info("stopping supersim")

	if err := s.Orchestrator.Stop(ctx); err != nil {
		return fmt.Errorf("orchestrator failed to stop: %w", err)
	}

	return nil
}

func (s *Supersim) Stopped() bool {
	return s.Orchestrator.Stopped()
}

func (s *Supersim) ConfigAsString() string {
	var b strings.Builder

	fmt.Fprintf(&b, "\n\nAvailable Accounts\n")
	fmt.Fprintf(&b, "-----------------------\n")

	for i := range DefaultAccounts {
		addressHex, _ := s.hdAccountStore.AddressHexAt(uint32(i))
		fmt.Fprintf(&b, "(%d): %s\n", i, addressHex)
	}

	fmt.Fprintf(&b, "\n\nPrivate Keys\n")
	fmt.Fprintf(&b, "-----------------------\n")

	for i := range DefaultAccounts {
		privateKeyHex, _ := s.hdAccountStore.PrivateKeyHexAt(uint32(i))
		fmt.Fprintf(&b, "(%d): %s\n", i, privateKeyHex)
	}

	fmt.Fprintf(&b, "\nOrchestrator Config:\n")
	fmt.Fprint(&b, s.Orchestrator.ConfigAsString())

	return b.String()
}
