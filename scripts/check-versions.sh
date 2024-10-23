#!/bin/bash

set -euo pipefail

# Check if both arguments are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <contracts_version> <go_version>"
    exit 1
fi

contracts_version=$1
go_version=$2

# Extract the commit hash from the go version
go_commit=$(echo $go_version | sed -n 's/.*-0\.\([0-9]*\)-\([a-f0-9]*\)$/\2/p')

if [[ $contracts_version == $go_commit* ]]; then
    echo "Versions match. Contracts: $contracts_version, Go: $go_version"
else
    echo "Version mismatch!"
    echo "Contracts version: $contracts_version"
    echo "Go version: $go_version"
    exit 1
fi
