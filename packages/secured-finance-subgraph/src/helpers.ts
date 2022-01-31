import { BigInt, Bytes, Address, ethereum, crypto, log, ByteArray } from '@graphprotocol/graph-ts'
import { 
    BIG_INT_BASIS_POINTS, 
    BIG_INT_ONE, 
    BIG_INT_ONE_DAY_SECONDS, 
    BTC_CCY_IDENTIFIER, 
    ETH_CCY_IDENTIFIER, 
    FIL_CCY_IDENTIFIER 
} from './constants'

export function getTimestampFromTerm(term: BigInt): BigInt {
    return term.times(BIG_INT_ONE_DAY_SECONDS)
}

export function getLoanPaymentFrequencyFromTerm(term: BigInt): BigInt {
    if (term.gt(BigInt.fromI32(365))) {
        return term.div(BigInt.fromI32(365))
    } else {
        return BIG_INT_ONE
    }
}

export function getLoanPaymentDeadlinesFromTerm(term: i32): BigInt[] {
    switch (term) {
        case 730:
            return [
                BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS), 
                BigInt.fromI32(365*2).times(BIG_INT_ONE_DAY_SECONDS)
            ]
        case 1095:
            return [
                BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS), 
                BigInt.fromI32(365*2).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*3).times(BIG_INT_ONE_DAY_SECONDS)
            ]
        case 1825:
            return [
                BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*2).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*3).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*4).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*5).times(BIG_INT_ONE_DAY_SECONDS),
            ]
        default: 
            return [BigInt.fromI32(term).times(BIG_INT_ONE_DAY_SECONDS)]
    }
}

export function getCurrencyName(identifier: string): string {
    if (identifier == ETH_CCY_IDENTIFIER) {
        return "ETH"
    } else if (identifier == FIL_CCY_IDENTIFIER) {
        return "FIL"
    } else if (identifier == "USDC") {
        return "USDC"
    } else if (identifier == BTC_CCY_IDENTIFIER) {
        return "BTC"
    }

    return ""
}

export function getTerm(termIndex: i32): string {
    switch (termIndex) {
        case 30:
            return '_1m'
        case 90:
            return '_3m'
        case 180:
            return '_6m'
        case 365:
            return '_1y'
        case 730:
            return '_2y'
        case 1095:
            return '_3y'
        case 1825:
            return '_5y'
        default:
            return null                    
    }
}

export function getCouponFractionsFromTerm(term: BigInt): BigInt {
    if (term.lt(BigInt.fromI32(360))) {
        return BIG_INT_BASIS_POINTS.times(term).div(BigInt.fromI32(360))
    } else {
        return BIG_INT_BASIS_POINTS
    }
}

export function packAddresses(party0: Address, party1: Address): ByteArray {
    let _party0: Address, _party1: Address

    if (party0.toHexString() < party1.toHexString()) {
        _party0 = party0
        _party1 = party1
    } else {
        _party0 = party1
        _party1 = party0
    }

    log.info('PACK-ADDRESSES {} {} ', [
        _party0.toHexString(),
        _party1.toHexString(),
    ]);

    let params: Array<Address> = [
        _party0,
        _party1,
    ];

    let encoded = ethereum.encode(ethereum.Value.fromAddressArray(params))!

    log.info('PACK-ADDRESSES-1 {} ', [
        encoded.toHexString(),
    ]);

    let packedHash = crypto.keccak256(encoded)

    log.info('PACK-ADDRESSES-2 {} ', [
        packedHash.toHexString(),
    ]);

    return packedHash
}

export function isFlippedAddresses(party0: Bytes, party1: Bytes): boolean {
    let flipped = party0.toHexString() < party1.toHexString() ? false : true 
    return flipped
}