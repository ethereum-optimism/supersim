import type { Rdns } from './register.js'
import type { EIP6963ProviderDetail } from './types.js'
import { requestProviders } from './utils.js'

export type Listener = (
  providerDetails: readonly EIP6963ProviderDetail[],
  meta?:
    | {
        added?: readonly EIP6963ProviderDetail[] | undefined
        removed?: readonly EIP6963ProviderDetail[] | undefined
      }
    | undefined,
) => void

export type Store = {
  /**
   * Clears the store, including all provider details.
   */
  clear(): void
  /**
   * Destroys the store, including all provider details and listeners.
   */
  destroy(): void
  /**
   * Finds a provider detail by its RDNS (Reverse Domain Name Identifier).
   */
  findProvider(args: { rdns: Rdns }): EIP6963ProviderDetail | undefined
  /**
   * Returns all provider details that have been emitted.
   */
  getProviders(): readonly EIP6963ProviderDetail[]
  /**
   * Resets the store, and emits an event to request provider details.
   */
  reset(): void
  /**
   * Subscribes to emitted provider details.
   */
  subscribe(
    listener: Listener,
    args?: { emitImmediately?: boolean | undefined } | undefined,
  ): () => void

  /**
   * @internal
   * Current state of listening listeners.
   */
  _listeners(): Set<Listener>
}

export function createStore(): Store {
  const listeners: Set<Listener> = new Set()
  let providerDetails: readonly EIP6963ProviderDetail[] = []

  const request = () =>
    requestProviders((providerDetail) => {
      if (
        providerDetails.some(
          ({ info }) => info.uuid === providerDetail.info.uuid,
        )
      )
        return

      providerDetails = [...providerDetails, providerDetail]
      listeners.forEach((listener) =>
        listener(providerDetails, { added: [providerDetail] }),
      )
    })
  let unwatch = request()

  return {
    _listeners() {
      return listeners
    },
    clear() {
      listeners.forEach((listener) =>
        listener([], { removed: [...providerDetails] }),
      )
      providerDetails = []
    },
    destroy() {
      this.clear()
      listeners.clear()
      unwatch?.()
    },
    findProvider({ rdns }) {
      return providerDetails.find(
        (providerDetail) => providerDetail.info.rdns === rdns,
      )
    },
    getProviders() {
      return providerDetails
    },
    reset() {
      this.clear()
      unwatch?.()
      unwatch = request()
    },
    subscribe(listener, { emitImmediately } = {}) {
      listeners.add(listener)
      if (emitImmediately) listener(providerDetails, { added: providerDetails })
      return () => listeners.delete(listener)
    },
  }
}
