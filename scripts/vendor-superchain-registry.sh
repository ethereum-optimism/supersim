#!/bin/bash

# Constants
COMMIT_FILE="superchain-registry-commit.txt"
TARGET_DIR="registry/vendor-superchain-registry/configs"
REPO_URL="https://github.com/ethereum-optimism/superchain-registry.git"
TMP_DIR="$(pwd)/tmp/superchain-registry"

cleanup() {
    rm -rf "$(pwd)/tmp"
}

check_prerequisites() {
    if [ ! -f "$COMMIT_FILE" ]; then
        echo "Error: $COMMIT_FILE does not exist" >&2
        exit 1
    fi

    COMMIT_HASH=$(tr -d '[:space:]' < "$COMMIT_FILE")
    if [ -z "$COMMIT_HASH" ]; then
        echo "Error: $COMMIT_FILE is empty" >&2
        exit 1
    fi
}

# Set up cleanup trap
trap cleanup EXIT INT TERM

# Main execution
main() {
    check_prerequisites

    # Prepare temporary directory
    cleanup  # Clean up any existing tmp directory
    mkdir -p "$TMP_DIR"

    echo "Cloning superchain-registry at commit: ${COMMIT_HASH}"
    git clone "$REPO_URL" "$TMP_DIR"
    
    # Switch to tmp directory, checkout commit, and return
    (cd "$TMP_DIR" && git checkout --quiet "$COMMIT_HASH")

    # Create target directory and copy files
    mkdir -p "$TARGET_DIR"
    cp -r "$TMP_DIR/superchain/configs/"* "$TARGET_DIR/"

    echo "Config files have been copied to $TARGET_DIR"
}

main
