# webauthn-p256

## 0.0.5

### Patch Changes

- [`11f84a8`](https://github.com/wevm/webauthn-p256/commit/11f84a821b241672fe83d2b464afca4be84b6bfc) Thanks [@jxom](https://github.com/jxom)! - Added `attestation` + `authenticatorSelection` as parameters to `createCredential`.

- [`11f84a8`](https://github.com/wevm/webauthn-p256/commit/11f84a821b241672fe83d2b464afca4be84b6bfc) Thanks [@jxom](https://github.com/jxom)! - Added `raw` (full credential response) to the return value of `createCredential`.

## 0.0.4

### Patch Changes

- [`ad1a1d4`](https://github.com/wevm/webauthn-p256/commit/ad1a1d48d083fd855ec3458f985f150dea2baa5f) Thanks [@jxom](https://github.com/jxom)! - Fixed `createCredential` and `sign` parameters to conform to exact optional property types.

## 0.0.3

### Patch Changes

- [`928f39c`](https://github.com/wevm/webauthn-p256/commit/928f39c40981607057a0a22bde4183a605c6488d) Thanks [@jxom](https://github.com/jxom)! - **Breaking:**

  - Serialized `publicKey` (hex string) on the return value of `createCredential`.
  - Serialized `signature` (hex string) on the return value of `sign`.
  - Modified `webauthn.typeIndex` and `webauthn.challengeIndex` to return `number` instead of `bigint`.
  - `verify` now expects a serialized `signature` and `publicKey`.

## 0.0.2

### Patch Changes

- [`1fa026f`](https://github.com/wevm/webauthn-p256/commit/1fa026fedbe2d9f00955c964b7dd5dd7f0464d2c) Thanks [@jxom](https://github.com/jxom)! - Initial release.
