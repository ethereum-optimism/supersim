import type { EIP1193Provider, Rdns } from './register.js'

/**
 * Event detail from the `"eip6963:announceProvider"` event.
 */
export interface EIP6963ProviderDetail<
  TProvider = EIP1193Provider,
  TRdns extends string = Rdns,
> {
  info: EIP6963ProviderInfo<TRdns>
  provider: TProvider
}

/**
 * Metadata of the EIP-1193 Provider.
 */
export interface EIP6963ProviderInfo<TRdns extends string = Rdns> {
  icon: `data:image/${string}` // RFC-2397
  name: string
  rdns: TRdns
  uuid: string
}

/**
 * Event type to announce an EIP-1193 Provider.
 */
export interface EIP6963AnnounceProviderEvent<TProvider = EIP1193Provider>
  extends CustomEvent<EIP6963ProviderDetail<TProvider>> {
  type: 'eip6963:announceProvider'
}

/**
 * Event type to request EIP-1193 Providers.
 */
export interface EIP6963RequestProviderEvent extends Event {
  type: 'eip6963:requestProvider'
}
