#!/bin/bash

# Get the latest commit hash from the main branch
LATEST_COMMIT=$(curl -s "https://api.github.com/repos/ethereum-optimism/superchain-registry/commits/main" | grep '"sha"' | head -n 1 | cut -d '"' -f 4)

if [ -z "$LATEST_COMMIT" ]; then
    echo "Error: Failed to fetch latest commit hash"
    exit 1
fi

# Write the commit hash to the file
echo "$LATEST_COMMIT" > superchain-registry-commit.txt

echo "Updated superchain-registry-commit.txt with latest commit: $LATEST_COMMIT"
