package supersim

import (
	"context"
	"fmt"
	"log"
	"os"
	"testing"
	"time"

	oplog "github.com/ethereum-optimism/optimism/op-service/log"

	"github.com/ethereum/go-ethereum/rpc"
)

const (
	anvilClientTimeout                = 5 * time.Second
	emptyCode                         = "0x"
	crossL2InboxAddress               = "0x4200000000000000000000000000000000000022"
	l2toL2CrossDomainMessengerAddress = "0x4200000000000000000000000000000000000023"
	l1BlockAddress                    = "0x4200000000000000000000000000000000000015"
)

func TestGenesisState(t *testing.T) {
	logger := oplog.NewLogger(os.Stderr, oplog.DefaultCLIConfig())
	supersim := NewSupersim(logger, &DefaultConfig)
	err := supersim.Start(context.Background())

	defer func() {
		err := supersim.Stop(context.Background())
		if err != nil {
			t.Fatalf("Failed to stop supersim: %v", err)
		}
	}()

	if err != nil {
		t.Fatalf("Failed to start supersim: %v", err)
	}

	for _, l2ChainConfig := range DefaultConfig.l2Chains {
		rpcUrl := fmt.Sprintf("http://127.0.0.1:%d", l2ChainConfig.opSimConfig.Port)
		client, clientCreateErr := rpc.Dial(rpcUrl)

		if clientCreateErr != nil {
			t.Fatalf("Failed to create client: %v", clientCreateErr)
		}

		defer client.Close()

		var code string
		err := client.CallContext(context.Background(), &code, "eth_getCode", crossL2InboxAddress, "latest")
		if err != nil {
			log.Fatalf("Failed to get code: %v", err)
		}

		if code == emptyCode {
			t.Error("CrossL2Inbox is not deployed")
		}

		err = client.CallContext(context.Background(), &code, "eth_getCode", l2toL2CrossDomainMessengerAddress, "latest")
		if err != nil {
			log.Fatalf("Failed to get code: %v", err)
		}
		if code == emptyCode {
			t.Error("L2toL2CrossDomainMessenger is not deployed")
		}

		err = client.CallContext(context.Background(), &code, "eth_getCode", l1BlockAddress, "latest")
		if err != nil {
			log.Fatalf("Failed to get code: %v", err)
		}
		if code == emptyCode {
			t.Error("L1Block is not deployed")
		}
	}

}
