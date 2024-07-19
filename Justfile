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
    git fetch --depth=1 origin 9001eef4784dc2950d0bdcda29752cb2939bae2b && \
    git reset --hard FETCH_HEAD && \
    git submodule update --init --recursive && \
    make cannon-prestate

generate-genesis: checkout-optimism-monorepo
    python3 scripts/generate-genesis.py