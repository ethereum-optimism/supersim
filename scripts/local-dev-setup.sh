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

    # add `~/bin` to the paths that your shell searches for executables
    # this line should be added to your shells initialization file,
    # e.g. `~/.bashrc` or `~/.zshrc`
    export PATH="$PATH:$HOME/bin"

    echo "just has been installed"
else
    echo "skipping just install, it already exists."
fi
