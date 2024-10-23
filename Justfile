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

install-abigen:
  go install github.com/ethereum/go-ethereum/cmd/abigen@$(jq -r .abigen < versions.json)

force-install-monorepo-version:
    cd contracts/lib/optimism && \
    forge install ethereum-optimism/optimism@$(cat ../../../monorepo-commit-hash) --no-commit

calculate-artifact-url: 
    #!/usr/bin/env bash
    cd contracts/lib/optimism/packages/contracts-bedrock && \
    checksum=$(bash scripts/ops/calculate-checksum.sh) && \
    echo "https://storage.googleapis.com/oplabs-contract-artifacts/artifacts-v1-$checksum.tar.gz"

generate-monorepo-bindings: install-abigen
    ./scripts/generate-bindings.sh -u $(just calculate-artifact-url) -n CrossL2Inbox,L2ToL2CrossDomainMessenger,L1BlockInterop,SuperchainWETH,SuperchainERC20,SuperchainTokenBridge -o ./bindings

generate-genesis: build-contracts
    go run ./genesis/cmd/main.go --monorepo-artifacts $(just calculate-artifact-url) --periphery-artifacts ./contracts/out --outdir ./genesis/generated

generate-all: generate-genesis generate-monorepo-bindings