package supersim

import (
	"context"

	"github.com/ethereum-optimism/supersim/anvil"

	"github.com/ethereum/go-ethereum/log"
)

type Supersim struct {
	log log.Logger

	anvil *anvil.Anvil
}

func NewSupersim(log log.Logger) *Supersim {
	anvil := anvil.New(log, &anvil.Config{ChainId: 10, Port: 9545})
	return &Supersim{log, anvil}
}

func (s *Supersim) Start(ctx context.Context) error {
	s.log.Info("starting supersim")
	return s.anvil.Start(ctx)
}

func (s *Supersim) Stop(_ context.Context) error {
	s.log.Info("stopping supersim")
	return s.anvil.Stop()
}

func (s *Supersim) Stopped() bool {
	return s.anvil.Stopped()
}
