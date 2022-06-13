import { Bytes } from '@graphprotocol/graph-ts';
import { EMPTY_BYTES32_PREFIX } from '../../src/constants';

export function toBytes32(text: string): Bytes {
    const bytes = Bytes.fromUTF8(text);
    const emptyBytes = Bytes.fromByteArray(EMPTY_BYTES32_PREFIX).slice(0, 32 - bytes.byteLength);
    return bytes.concat(Bytes.fromUint8Array(emptyBytes));
}