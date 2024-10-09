import type { ErrorType } from '../../errors/utils.js';
import type { ByteArray, Hex } from '../../types/misc.js';
import { type ToBytesErrorType } from '../encoding/toBytes.js';
import { type IsHexErrorType } from './isHex.js';
export type IsBytesEqualErrorType = IsHexErrorType | ToBytesErrorType | ErrorType;
export declare function isBytesEqual(a_: ByteArray | Hex, b_: ByteArray | Hex): boolean;
//# sourceMappingURL=isBytesEqual.d.ts.map