# Safe Gateway TypeScript SDK

[![npm](https://img.shields.io/npm/v/@safe-global/safe-gateway-typescript-sdk?label=%40safe-global%2Fsafe-gateway-typescript-sdk)](https://www.npmjs.com/package/@safe-global/safe-gateway-typescript-sdk)

A TypeScript SDK for the [Safe Client Gateway](https://github.com/safe-global/safe-client-gateway)

📖 [Type reference](https://safe-global.github.io/safe-gateway-typescript-sdk/modules.html)   |   <img src="https://github.com/safe-global/safe-gateway-typescript-sdk/assets/381895/ebfa2525-ff65-4597-af2a-17a440ccfb33" height="20" alt="Swagger" valign="text-top" /> [CGW Swagger](https://safe-client.safe.global)

## Usage policy

NB: Safe Client Gateway isn't meant for public use.
Please _do not_ use this SDK if you're building, e.g., a Safe App.

## Using the SDK

Install:

```shell
yarn add @safe-global/safe-gateway-typescript-sdk
```

Import:

```ts
import { getChainsConfig, type ChainListResponse } from '@safe-global/safe-gateway-typescript-sdk'
```

Use:

```ts
const chains = await getChainsConfig()
```

The SDK needs no initialization unless you want to override the base URL. You can set an alternative base URL like so:

```ts
import { setBaseUrl } from '@safe-global/safe-gateway-typescript-sdk'

// Switch the SDK to dev mode
setBaseUrl('https://safe-client.staging.5afe.dev')
```

The full SDK reference can be found [here](https://safe-global.github.io/safe-gateway-typescript-sdk/modules.html).

## Adding an endpoint

Endpoint types are defined in `src/types/gateway.ts`.

Each endpoint consists of:

- a function defined in `src/index.ts` (e.g. `getBalances`)
- a path definition (e.g. `'/chains/{chainId}/safes/{address}/balances/{currency}/'`)
- operation definition (e.g. `safes_balances_list`)
- response definition

To add a new endpoint, follow the pattern set by the existing endpoints.

## Eslint & prettier

This command will run before every commit:

```shell
yarn eslint:fix
```

## Tests

To run the unit and e2e tests locally:

```shell
yarn test
```

N.B.: the e2e tests make actual API calls on staging.
