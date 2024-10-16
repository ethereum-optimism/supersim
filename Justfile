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

clean-lib:
    rm -rf lib

checkout-optimism-monorepo:
    rm -rf lib/optimism
    mkdir -p lib/optimism && \
    cd lib/optimism && \
    git init && \
    git remote add origin https://github.com/ethereum-optimism/optimism.git && \
    git fetch --depth=1 origin $(cat ../../monorepo-commit-hash) && \
    git reset --hard FETCH_HEAD && \
    git submodule update --init --recursive --progress --depth=1

calculate-artifact-url: 
    #!/usr/bin/env bash
    cd lib/optimism/packages/contracts-bedrock && \
    checksum=$(bash scripts/ops/calculate-checksum.sh) && \
    echo "https://storage.googleapis.com/oplabs-contract-artifacts/artifacts-v1-$checksum.tar.gz"

generate-monorepo-bindings:
    ./scripts/generate-bindings.sh -u $(just calculate-artifact-url) -n CrossL2Inbox,L2ToL2CrossDomainMessenger,L1BlockInterop,SuperchainWETH,SuperchainERC20,SuperchainTokenBridge -o ./bindings

generate-genesis: build-contracts checkout-optimism-monorepo
    go run ./genesis/cmd/main.go --monorepo-artifacts $(just calculate-artifact-url) --periphery-artifacts ./contracts/out --outdir ./genesis/generated

generate-all: generate-genesis generate-monorepo-bindings