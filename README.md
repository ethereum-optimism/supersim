# Supersim
A local development environment for testing against multiple nodes running simultaneously.

## Table of Contents
- [Overview](#overview)
- [Getting started](#getting-started)
  - [Installation](#installation)
- [Features](#features)
  - [Vanilla mode](#vanilla-mode)
  - [Forked mode](#forked-mode)
- [Join Discord](#join-discord)
- [Contributing](#contributing)
- [License](#license)

## Overview
Supersim allows developers to start multiple local evm nodes with one command, and coordinates message passing and asset transfer between these chains, following the Superchain interoperability spec.

Supersim is a lightweight tool that simulates an interoperable Superchain environment locally. It does not require a complicated devnet setup and is run using cli commands with configuration options that fall back to sensible defaults if they are not specified. Each chain is an instance of [anvil](https://book.getfoundry.sh/reference/anvil/), though future versions may support other local testing tools.

## Getting started
### Installation
TODO

## Features
### Vanilla mode
Brings up one L1 chain and 2 L2 chains with the appropriate OP Stack contracts already deployed, allowing you to locally test against the latest OP Stack features.

How to run in vanilla mode:
TODO: insert command

### Forked mode
TODO

## Examples
TODO

## Join Discord
Join our discord [here](https://discord.gg/Scdnrw8d) and reach out to us in the [interop-devex](https://discord.com/channels/1244729134312198194/1255653436079210496) channel.

## Contributing

Contributions are encouraged, but please open an issue before making any major changes to ensure your changes will be accepted.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contributing information.

## License

Files are licensed under the [MIT license](./LICENSE).

<a href="./LICENSE"><img src="https://user-images.githubusercontent.com/35039927/231030761-66f5ce58-a4e9-4695-b1fe-255b1bceac92.png" alt="License information" width="200" /></a>