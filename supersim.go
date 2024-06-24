package supersim

import (
	"context"

	"github.com/ethereum/go-ethereum/log"
)

type Supersim struct {
	log log.Logger
}

func NewSupersim(log log.Logger) *Supersim {
	return &Supersim{log}
}

func (s *Supersim) Start(ctx context.Context) error {
	s.log.Info("starting supersim")
	return nil
}

func (s *Supersim) Stop(ctx context.Context) error {
	s.log.Info("stopping supersim")
	return nil
}

func (s *Supersim) Stopped() bool {
	return false
}
