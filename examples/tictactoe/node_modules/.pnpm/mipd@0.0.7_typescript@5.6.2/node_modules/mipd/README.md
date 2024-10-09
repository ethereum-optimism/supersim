<br/>

<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/wagmi-dev/mipd/blob/main/.github/mipd-dark-hug.svg">
      <img alt="mipd logo" src="https://github.com/wagmi-dev/mipd/blob/main/.github/mipd-light-hug.svg" width="auto" height="60">
    </picture>
</p>

<p align="center">
  TypeScript Utilities for <a href="https://eips.ethereum.org/EIPS/eip-6963">EIP-6963: Multi Injected Provider Discovery</a>
<p>

## Contents

- [Install](#install)
- [Store](#store)
- [Utilities](#utilities)
  - [`requestProviders`](#requestproviders)
  - [`announceProvider`](#announceprovider)
- [`window` Type Polyfill](#window-polyfill)
- [Types](#types)
- [Configuration](#configuration)

## Install

```bash
npm i mipd
```

```bash
pnpm add mipd
```

```bash
yarn add mipd
```

## Store

The MIPD Store stores the Providers that have been emitted by a Wallet (or other source), and provides a way to subscribe to the store and retrieve the Providers.

### Overview

```ts
import { createStore } from 'mipd'

// Set up a MIPD Store, and request Providers.
const store = createStore()

// Subscribe to the MIPD Store.
store.subscribe(providerDetails => {
  console.log(providerDetails)
  // => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
})

// Retrieve emitted Providers.
store.getProviders()
// => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]

// Find a Provider Detail.
store.findProvider({ rdns: 'com.example' })
// => EIP6963ProviderDetail | undefined

// Clear the store, including all Providers.
store.clear()

// Reset the store, and emit an event to request Providers.
store.reset()

// Destroy the store, and remove all Providers and event listeners.
store.destroy()
```

### Usage

#### Vanilla JS

```tsx
import { useSyncExternalStore } from 'react'
import { createStore } from 'mipd'

const store = createStore()

let providers = store.getProviders()
store.subscribe(providerDetails => (providers = providerDetails))
```

#### React

```tsx
import { useSyncExternalStore } from 'react'
import { createStore } from 'mipd'

const store = createStore()

function Example() {
  const providers = useSyncExternalStore(store.subscribe, store.getProviders)
  // ...
}
```

#### Svelte

```html
<script lang="ts">
  import { readable } from 'svelte/store'
  import { createStore } from 'mipd'
  
  const store = createStore()
  const providers = readable(store.getProviders(), store.subscribe)
</script>

<!-- ... -->
```

#### Vue

```html
<script setup lang="ts">
  import { reactive } from 'vue'
  import { createStore } from 'mipd'

  const store = createStore()
  const state = reactive({ providers: store.getProviders() })
  store.subscribe(providers => (state.providers = providers))
</script>

<!-- ... -->
```

### API

#### createStore()

Creates a MIPD Store, and emits an event to request Providers from the Wallet(s).

```ts
const store = createStore()
```

#### store.subscribe(listener, args)

Subscribes to the MIPD Store, and returns a function to unsubscribe.

```ts
const unsubscribe = store.subscribe(providers => {
  console.log(providers)
  // => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
})
```

**Definition**

```ts
export type Listener = (
  // The updated Providers store.
  providerDetails: EIP6963ProviderDetail[],
  meta?: {
    // The Providers that were added to the store.
    added?: EIP6963ProviderDetail[]
    // The Providers that were removed from the store.
    removed?: EIP6963ProviderDetail[]
  },
) => void

function subscribe(
  // The listener function.
  listener: Listener, 
  args?: { 
    // If `true`, the listener will be called immediately with the stored Providers.
    emitImmediately?: boolean 
  }
): () => void // Returns an unsubscribe function.
```

#### store.getProviders()

Returns the current Providers.

```ts
const providers = store.getProviders()
// => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
```

**Definition**

```ts
function getProviders(): EIP6963ProviderDetail[]
```

#### store.findProvider(args)

Finds a provider detail by its RDNS (Reverse Domain Name Identifier).

```ts
const provider = store.findProvider({ rdns: 'com.example' })
```

**Definition**

```ts
function findProvider(args: { 
  // The RDNS of the Provider Detail to find.
  rdns: string 
}): EIP6963ProviderDetail | undefined
```

#### store.clear()

Clears the store, including all Providers.

```ts
store.clear()
```

**Definition**

```ts
function clear(): void
```

#### store.reset()

Resets the store, and emits an event to request Providers from the Wallet(s).

```ts
store.reset()
```

**Definition**

```ts
function reset(): void
```

#### store.destroy()

Destroys the store, and removes all Providers and event listeners.

```ts
store.destroy()
```

**Definition**

```ts
function destroy(): void
```

## Utilities

### requestProviders

The `requestProviders` utility emits an event to request Providers from the Wallet(s). It returns an `unsubscribe` function to clean up event listeners.

```ts
import { requestProviders } from 'mipd'

let providers = []

const unsubscribe = requestProviders(providerDetail => providers.push(providerDetail))
```

**Definition**

```ts
function requestProviders(
  // The listener.
  listener: (providerDetail: EIP6963ProviderDetail) => void
// Unsubscribe function to clean up the listener.
): () => void
```

### announceProvider

The `announceProvider` utility emits an event to announce a Provider to the Wallet(s), and also listen for incoming requests. It returns an `unsubscribe` function to clean up event listeners.

```ts
import { announceProvider } from 'mipd'

const unsubscribe = announceProvider({
  info: {
    icon: 'data:image/svg+xml,<svg width="32px" height="32px" viewBox="0 0 32 32"/>',
    name: 'Example',
    rdns: 'com.example',
    uuid: '00000000-0000-0000-0000-000000000000'
  },
  provider: new EIP1193Provider()
})
```

**Definition**

```ts
function requestProviders(
  // The EIP-1193 Provider and Provider Info.
  detail: EIP6963ProviderDetail
// Unsubscribe function to clean up the listener.
): () => void
```

## `window` Polyfill

By importing the `mipd/window` Polyfill, the types on `window.addEventListener` will be inferred to include the `EIP6963AnnounceProviderEvent` and `EIP6963RequestProviderEvent` types.

```ts
import 'mipd/window'

window.addEventListener(
  'eip6963:announceProvider'
  // ^? 'eip6963:announceProvider' | 'eip6963:requestProvider' | 'click' | ...

  event => {
  // ^? EIP6963AnnounceProviderEvent

    event.type
    //    ^? 'eip6963:announceProvider'
    event.detail
    //    ^? EIP6963ProviderDetail
    event.detail.info
    //           ^? EIP6963ProviderInfo
    event.detail.provider
    //           ^? EIP1193Provider
  }
)

window.addEventListener(
  'eip6963:requestProvider'
  // ^? 'eip6963:announceProvider' | 'eip6963:requestProvider' | 'click' | ...

  event => {
  // ^? EIP6963RequestProviderEvent

    event.type
    //    ^? 'eip6963:requestProvider'
  }
)
```

## Types

### EIP6963ProviderDetail

Event detail from `eip6963:announceProvider`.

#### Import

```ts
import { type EIP6963ProviderDetail } from 'mipd'
```

#### Definition

```ts
export interface EIP6963ProviderDetail<TProvider = Config['EIP1193Provider']> {
  info: EIP6963ProviderInfo
  provider: TProvider
}
```

### EIP6963ProviderInfo

Metadata of the EIP-1193 Provider.

#### Import

```ts
import { type EIP6963ProviderInfo } from 'mipd'
```

#### Definition

```ts
export interface EIP6963ProviderInfo {
  icon: string
  name: string
  rdns?: ... | (string & {})
  uuid: string
}
```

### EIP6963AnnounceProviderEvent

Event type to announce an EIP-1193 Provider.

#### Import

```ts
import { type EIP6963AnnounceProviderEvent } from 'mipd'
```

#### Definition

```ts
export interface EIP6963AnnounceProviderEvent<TProvider = DefaultProvider>
  extends CustomEvent<EIP6963ProviderDetail<TProvider>> {
  type: 'eip6963:announceProvider'
}
```

### EIP6963RequestProviderEvent

Event type to request EIP-1193 Providers.

#### Import

```ts
import { type EIP6963RequestProviderEvent } from 'mipd'
```

#### Definition

```ts
export interface EIP6963RequestProviderEvent extends Event {
  type: 'eip6963:requestProvider'
}
```

## Configuration

In some cases you might want to tune the global types (e.g. the `EIP1193Provider`). To do this, the following configuration options are available:

| Type                | Default                                                        | Description            |
| ------------------- | -------------------------------------------------------------- | ---------------------- |
| `provider`          | `import('viem').EIP1193Provider`                               | The EIP-1193 Provider. |
| `rdns`              | `'com.coinbase' \| 'com.enkrypt' \| 'io.metamask' \| 'io.zerion' \| (string & {})` | Deterministic identifier for the Provider in the form of an rDNS (Reverse Domain Name Notation) |

Configuration options are customizable using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html). Extend the `Register` interface either directly in your code or in a `d.ts` file (e.g. `eip6963.d.ts`):

```ts
import { type EIP1193Provider } from './eip1193-provider'

declare module 'mipd' {
  interface Register {
    provider: EIP1193Provider
  }
}
```

## Authors

- [@jxom](https://github.com/jxom) (jxom.eth, [Twitter](https://twitter.com/jakemoxey))
- [@tmm](https://github.com/tmm) (awkweb.eth, [Twitter](https://twitter.com/awkweb))

## License

[MIT](/LICENSE) License
