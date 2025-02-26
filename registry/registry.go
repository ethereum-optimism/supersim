package registry

import (
	"embed"
	"errors"
	"io/fs"
	"strings"

	"github.com/ethereum/go-ethereum/superchain"
)

type RegistryChain struct {
	Identifier string
	Config     *superchain.ChainConfig
}

type RegistrySuperchain struct {
	Identifier string
	Config     *superchain.Superchain
	Chains     []*RegistryChain
}

var ErrEmptyVersion = errors.New("empty version")

var superchainFSBasePath = "vendor-superchain-registry/configs"

//go:embed vendor-superchain-registry/configs
var superchainFS embed.FS

var SuperchainsByIdentifier = map[string]*RegistrySuperchain{}

var ChainsByID = map[uint64]*RegistryChain{}

var AddressesByID = map[uint64]*superchain.AddressesConfig{}

var GenesisSystemConfigsByID = map[uint64]*superchain.SystemConfig{}

func isConfigFile(c fs.DirEntry) bool {
	return (!c.IsDir() &&
		strings.HasSuffix(c.Name(), ".toml") &&
		c.Name() != "superchain.toml" &&
		c.Name() != "semver.toml")
}
