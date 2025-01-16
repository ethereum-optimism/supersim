set positional-arguments

build-contracts:
    forge --version
    forge build --sizes --root ./contracts

build-go:
    go build ./...

lint-go:
    golangci-lint run -E goimports,sqlclosecheck,bodyclose,asciicheck,misspell,errorlint --timeout 5m -e "errors.As" -e "errors.Is" ./...

test-contracts:
    forge test -vvv --root ./contracts

test-go:
    go test ./... -v

start:
    go run ./...

version-monorepo-contracts:
    cd contracts/lib/optimism && \
    git rev-parse HEAD

version-monorepo-go:
    go list -m -f '{{"{{"}}.Version{{"}}"}}' github.com/ethereum-optimism/optimism

check-monorepo-versions:
    #!/usr/bin/env bash
    ./scripts/check-versions.sh $(just version-monorepo-contracts) $(just version-monorepo-go)

fetch-monorepo-contracts version:
    cd contracts/lib/optimism && \
    git fetch origin {{version}}

install-monorepo-go version:
    go get github.com/ethereum-optimism/optimism@{{version}} && go mod tidy

install-monorepo-contracts version: (fetch-monorepo-contracts version)
    cd contracts && \
    forge install ethereum-optimism/optimism@{{version}} --no-commit

install-monorepo version: (install-monorepo-go version) (install-monorepo-contracts version)

install-abigen:
  go install github.com/ethereum/go-ethereum/cmd/abigen@$(jq -r .abigen < versions.json)

calculate-artifact-url: 
    #!/usr/bin/env bash
    cd contracts/lib/optimism/packages/contracts-bedrock && \
    checksum=$(bash scripts/ops/calculate-checksum.sh) && \
    echo "https://storage.googleapis.com/oplabs-contract-artifacts/artifacts-v1-$checksum.tar.gz"

generate-monorepo-bindings: install-abigen
    ./scripts/generate-bindings.sh -u $(just calculate-artifact-url) -n CrossL2Inbox,L2ToL2CrossDomainMessenger,L1BlockInterop,SuperchainERC20,SuperchainWETH,SuperchainTokenBridge -o ./bindings

generate-genesis: build-contracts
    go run ./genesis/cmd/main.go --monorepo-artifacts $(just calculate-artifact-url) --periphery-artifacts ./contracts/out --outdir ./genesis/generated

generate-all version: (install-monorepo version) generate-genesis generate-monorepo-bindings
