import type { Account, Address } from 'viem'

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type UnionEvaluate<type> = type extends object ? Prettify<type> : type

export type IsUndefined<T> = [undefined] extends [T] ? true : false
export type ErrorType<name extends string = 'Error'> = Error & { name: name }

export type GetAccountParameter<
  account extends Account | undefined = Account | undefined,
  accountOverride extends Account | Address | undefined = Account | Address,
  required extends boolean = true,
> =
  IsUndefined<account> extends true
    ? required extends true
      ? { account: accountOverride | Account | Address }
      : { account?: accountOverride | Account | Address | undefined }
    : { account?: accountOverride | Account | Address | undefined }
