set positional-arguments

build-contracts:
    forge --version
    forge build --sizes --root ./

build-go:
    go build ./...

lint-go:
    golangci-lint run -E goimports,sqlclosecheck,bodyclose,asciicheck,misspell,errorlint --timeout 5m -e "errors.As" -e "errors.Is" ./...

test-contracts:
    forge test -vvv --root ./

test-go:
    go test ./... -v

start:
    go run ./...

clean-lib:
    rm -rf lib

checkout-optimism-monorepo:
    cd lib/optimism && \
    git checkout $(cat ../../monorepo-commit-hash)

install-submodules:
    git submodule update --init --recursive --progress --depth=1

calculate-artifact-url: 
    #!/usr/bin/env bash
    cd lib/optimism/packages/contracts-bedrock && \
    checksum=$(bash scripts/ops/calculate-checksum.sh) && \
    echo "https://storage.googleapis.com/oplabs-contract-artifacts/artifacts-v1-$checksum.tar.gz"

generate-monorepo-bindings: checkout-optimism-monorepo install-submodules
    ./scripts/generate-bindings.sh -u $(just calculate-artifact-url) -n CrossL2Inbox,L2ToL2CrossDomainMessenger,L1BlockInterop,SuperchainWETH,SuperchainERC20,SuperchainTokenBridge -o ./bindings

generate-genesis: checkout-optimism-monorepo install-submodules build-contracts
    go run ./genesis/cmd/main.go --monorepo-artifacts $(just calculate-artifact-url) --periphery-artifacts ./contracts/out --outdir ./genesis/generated

generate-all: generate-genesis generate-monorepo-bindings