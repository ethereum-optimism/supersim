#!/usr/bin/env bash

##################
#   Just Setup   #
##################

echo "Checking just setup"

if ! command -v just > /dev/null 2>&1; then
    # create ~/bin
    mkdir -p ~/bin

    # download and extract just to ~/bin/just
    curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash -s -- --to ~/bin

    # add `~/bin` to your path
    export PATH="$PATH:$HOME/bin"

    echo "just has been installed"
else
    echo "skipping just install, it already exists."
fi

##################
#   Go Setup   #
##################

echo "Checking go setup"

if ! command -v golangci-lint > /dev/null 2>&1; then
    # binary will be $(go env GOPATH)/bin/golangci-lint
    echo "Installing golangci-lint"
    curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.59.1
    golangci-lint --version
fi
