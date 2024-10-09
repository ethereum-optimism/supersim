# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.0.1]
### Changed
- Bump `@metamask/safe-event-emitter` from `^2.0.0` to `^3.0.0` ([#94](https://github.com/MetaMask/eth-json-rpc-filters/pull/94))

## [6.0.0]
### Changed
- **BREAKING:** Block filter middleware will not throw an error if a block is not found ([#89](https://github.com/MetaMask/eth-json-rpc-filters/pull/89))

## [5.1.0]
### Changed
- Remove `eth-json-rpc-middleware` dependency ([#76](https://github.com/MetaMask/eth-json-rpc-filters/pull/76))
  - This package is still used in tests as a `devDependency`, but it's not used in the published package anymore.

### Fixed
- Fix `eth_getFilterLogs` ([#84](https://github.com/MetaMask/eth-json-rpc-filters/pull/84))
- Fix for null reference exception when normalizing the block ([#83](https://github.com/MetaMask/eth-json-rpc-filters/pull/83))

## [5.0.0] - 2022-05-10
### Added
- Add retry logic to `getBlocksForRange`, treating a null block number as failure ([#61](https://github.com/MetaMask/eth-json-rpc-filters/pull/61))

### Changed
- **BREAKING:** Set minimum Node.js version to v12 ([#50](https://github.com/MetaMask/eth-json-rpc-filters/pull/50))
  - We officially support Node 12, 14, and 16, in alignment with our other packages.

## [4.2.2] - 2021-02-04
### Changed
- Replace `await-semaphore` with `async-mutex` ([#33](https://github.com/MetaMask/eth-json-rpc-filters/pull/33))
- Move `pify` to production dependencies and update to v5 ([#39](https://github.com/MetaMask/eth-json-rpc-filters/pull/39) and [#40](https://github.com/MetaMask/eth-json-rpc-filters/pull/40))
- Cleanup manifest metadata ([#43](https://github.com/MetaMask/eth-json-rpc-filters/pull/43) and [#42](https://github.com/MetaMask/eth-json-rpc-filters/pull/42))
- Update `json-rpc-engine` from v5 to v6 ([#35](https://github.com/MetaMask/eth-json-rpc-filters/pull/35))
- Update to `@metamask/safe-event-emitter` v2 ([#37](https://github.com/MetaMask/eth-json-rpc-filters/pull/37))
- Remove `lodash.flatmap` dependency ([#36](https://github.com/MetaMask/eth-json-rpc-filters/pull/36))

## [4.2.1] - 2020-09-22
### Changed
- Specify publish files ([#30](https://github.com/MetaMask/eth-json-rpc-filters/pull/30))

## [4.2.0] - 2020-09-22
### Changed
- Update RPC packages ([#29](https://github.com/MetaMask/eth-json-rpc-filters/pull/29))
  - `json-rpc-engine@5.3.0`
  - `eth-json-rpc-middleware@6.0.0`

[Unreleased]: https://github.com/MetaMask/eth-json-rpc-filters/compare/v6.0.1...HEAD
[6.0.1]: https://github.com/MetaMask/eth-json-rpc-filters/compare/v6.0.0...v6.0.1
[6.0.0]: https://github.com/MetaMask/eth-json-rpc-filters/compare/v5.1.0...v6.0.0
[5.1.0]: https://github.com/MetaMask/eth-json-rpc-filters/compare/v5.0.0...v5.1.0
[5.0.0]: https://github.com/MetaMask/eth-json-rpc-filters/compare/v4.2.2...v5.0.0
[4.2.2]: https://github.com/MetaMask/eth-json-rpc-filters/compare/v4.2.1...v4.2.2
[4.2.1]: https://github.com/MetaMask/eth-json-rpc-filters/compare/v4.2.0...v4.2.1
[4.2.0]: https://github.com/MetaMask/eth-json-rpc-filters/releases/tag/v4.2.0
