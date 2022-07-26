import { BigInt, Bytes } from '@graphprotocol/graph-ts';

export const EMPTY_STRING = Bytes.fromHexString('') as Bytes;

export const BIG_INT_BASIS_POINTS = BigInt.fromI32(10000);
export const BIG_INT_NOTICE_PERIOD = BigInt.fromI32(1209600);
export const BIG_INT_ONE_DAY_SECONDS = BigInt.fromI32(86400);
