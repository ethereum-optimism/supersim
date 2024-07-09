package supersim

import (
	"fmt"
	"strings"

	"context"

	"github.com/ethereum-optimism/supersim/hdaccount"
	"github.com/ethereum-optimism/supersim/orchestrator"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/log"
)

type Config struct {
	orchestratorConfig orchestrator.OrchestratorConfig
}

var (
	DefaultAccounts       uint64                  = 10
	DefaultMnemonic       string                  = "test test test test test test test test test test test junk"
	DefaultDerivationPath accounts.DerivationPath = accounts.DefaultRootDerivationPath
)

var DefaultConfig = Config{
	orchestratorConfig: orchestrator.OrchestratorConfig{

		ChainConfigs: []orchestrator.ChainConfig{
			{
				ChainID:        1,
				Port:           0,
				Accounts:       DefaultAccounts,
				Mnemonic:       DefaultMnemonic,
				DerivationPath: DefaultDerivationPath.String(),
			},
			{
				ChainID:        10,
				SourceChainID:  1,
				Port:           0,
				Accounts:       DefaultAccounts,
				Mnemonic:       DefaultMnemonic,
				DerivationPath: DefaultDerivationPath.String(),
			},
			{
				ChainID:        30,
				SourceChainID:  1,
				Port:           0,
				Accounts:       DefaultAccounts,
				Mnemonic:       DefaultMnemonic,
				DerivationPath: DefaultDerivationPath.String(),
			},
		},
	},
}

type Supersim struct {
	log            log.Logger
	hdAccountStore *hdaccount.HdAccountStore

	Orchestrator *orchestrator.Orchestrator
}

func NewSupersim(log log.Logger, config *Config) (*Supersim, error) {
	hdAccountStore, err := hdaccount.NewHdAccountStore(DefaultMnemonic, DefaultDerivationPath)
	if err != nil {
		// TODO: update NewSupersim to return an error
		return nil, fmt.Errorf("failed to create HD account store")
	}

	o, err := orchestrator.NewOrchestrator(log, &DefaultConfig.orchestratorConfig)
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

	fmt.Fprintf(&b, "\nSupersim Config:\n")
	fmt.Fprint(&b, s.Orchestrator.ConfigAsString())

	return b.String()
}
