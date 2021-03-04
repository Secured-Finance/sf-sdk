import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { BIG_DECIMAL_BASIS_POINTS, BIG_INT_BASIS_POINTS, BIG_INT_FIVE, BIG_INT_ONE, BIG_INT_ONE_DAY_SECONDS, BIG_INT_THREE, BIG_INT_TWO, BIG_INT_ZERO } from './constants'

export function getTimestampFromTerm(term: i32): BigInt {
    switch (term) {
        case 0:
            return BigInt.fromI32(90).times(BIG_INT_ONE_DAY_SECONDS)
        case 1:
            return BigInt.fromI32(180).times(BIG_INT_ONE_DAY_SECONDS)
        case 2:
            return BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS)
        case 3:
            return BigInt.fromI32(365*2).times(BIG_INT_ONE_DAY_SECONDS)
        case 4:
            return BigInt.fromI32(365*3).times(BIG_INT_ONE_DAY_SECONDS)
        case 5:
            return BigInt.fromI32(365*5).times(BIG_INT_ONE_DAY_SECONDS)
        default:
            return BIG_INT_ZERO
    }
}

export function getLoanPaymentFrequencyFromTerm(term: i32): BigInt {
    switch (term) {
        case 3:
            return BigInt.fromI32(2)
        case 4:
            return BigInt.fromI32(3)
        case 5:
            return BigInt.fromI32(5)
        default:
            return BigInt.fromI32(1)
    }
}

export function getLoanPaymentDeadlinesFromTerm(term: i32): BigInt[] {
    switch (term) {
        case 0:
            return [BigInt.fromI32(90).times(BIG_INT_ONE_DAY_SECONDS)]
        case 1:
            return [BigInt.fromI32(180).times(BIG_INT_ONE_DAY_SECONDS)]
        case 2:
            return [BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS)]
        case 3:
            return [
                BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS), 
                BigInt.fromI32(365*2).times(BIG_INT_ONE_DAY_SECONDS)
            ]
        case 4:
            return [
                BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS), 
                BigInt.fromI32(365*2).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*3).times(BIG_INT_ONE_DAY_SECONDS)
            ]
        case 5:
            return [
                BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*2).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*3).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*4).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365*5).times(BIG_INT_ONE_DAY_SECONDS),
            ]
        default: 
            return []
    }
}

export function getCurrency(ccyIndex: i32): string {
    switch (ccyIndex) {
        case 0:
            return 'ETH'
        case 1:
            return 'FIL'
        case 2:
            return 'USDC'
        default:
            return null
    }
}

export function getTerm(termIndex: i32): string {
    switch (termIndex) {
        case 0:
            return '_3m'
        case 1:
            return '_6m'
        case 2:
            return '_1y'
        case 3:
            return '_2y'
        case 4:
            return '_3y'
        case 5:
            return '_5y'
        default:
            return null                    
    }
}

export function getCouponFractionsFromTerm(term: i32): BigInt {
    switch(term) {
        case 0:
            return BIG_INT_BASIS_POINTS.times(BigInt.fromI32(90)).div(BigInt.fromI32(360))
        case 1:
            return BIG_INT_BASIS_POINTS.times(BigInt.fromI32(180)).div(BigInt.fromI32(360))
        default:
            return BIG_INT_BASIS_POINTS
    }
}