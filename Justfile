set positional-arguments

build-contracts:
    forge --version
    forge build --sizes --root ./contracts

build-go:
    go build ./...

test-contracts:
    forge test -vvv --root ./contracts

test-go:
    go test ./... -v

start:
    go run ./...