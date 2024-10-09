import type { EIP1193Provider } from './register.js'
import type {
  EIP6963AnnounceProviderEvent,
  EIP6963ProviderDetail,
} from './types.js'

////////////////////////////////////////////////////////////////////////////
// Announce Provider

export type AnnounceProviderParameters = EIP6963ProviderDetail<
  EIP1193Provider,
  string
>
export type AnnounceProviderReturnType = () => void

/**
 * Announces an EIP-1193 Provider.
 */
export function announceProvider(
  detail: AnnounceProviderParameters,
): AnnounceProviderReturnType {
  const event: CustomEvent<EIP6963ProviderDetail> = new CustomEvent(
    'eip6963:announceProvider',
    { detail: Object.freeze(detail) },
  )

  window.dispatchEvent(event)

  const handler = () => window.dispatchEvent(event)
  window.addEventListener('eip6963:requestProvider', handler)
  return () => window.removeEventListener('eip6963:requestProvider', handler)
}

////////////////////////////////////////////////////////////////////////////
// Request Providers

export type RequestProvidersParameters = (
  providerDetail: EIP6963ProviderDetail,
) => void
export type RequestProvidersReturnType = (() => void) | undefined

/**
 * Watches for EIP-1193 Providers to be announced.
 */
export function requestProviders(
  listener: RequestProvidersParameters,
): RequestProvidersReturnType {
  if (typeof window === 'undefined') return
  const handler = (event: EIP6963AnnounceProviderEvent) =>
    listener(event.detail)

  window.addEventListener('eip6963:announceProvider', handler)

  window.dispatchEvent(new CustomEvent('eip6963:requestProvider'))

  return () => window.removeEventListener('eip6963:announceProvider', handler)
}
