import { Address, BigDecimal, BigInt, Bytes } from '@graphprotocol/graph-ts'

export const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')
export const LENDING_MARKET_CONTROLLER_ADDR = Address.fromString('0x950C34a09Ce94ad6e89d5e31eDa0719737ffE144')
export const EMPTY_STRING = Bytes.fromHexString('') as Bytes
export const NULL_CALL_RESULT_STRING = '0x0000000000000000000000000000000000000000000000000000000000000001'
export const EMPTY_TX_HASH = Bytes.fromHexString('0x0000000000000000000000000000000000000000000000000000000000000000') as Bytes

export const BIG_DECIMAL_1E6 = BigDecimal.fromString('1e6')

export const BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')

export const BIG_DECIMAL_1E18 = BigDecimal.fromString('1e18')

export const BIG_DECIMAL_ZERO = BigDecimal.fromString('0')
export const BIG_DECIMAL_PERCENT_BASE = BigDecimal.fromString('100')
export const BIG_DECIMAL_AUTO_LIQUIDATION_LEVEL = BigDecimal.fromString('125')
export const BIG_DECIMAL_MARGIN_CALL_LEVEL = BigDecimal.fromString('150')
export const BIG_DECIMAL_LIQUIDATION_PERCENT = BigDecimal.fromString('120')
export const BIG_DECIMAL_BASIS_POINTS = BigDecimal.fromString('10000')

export const BIG_DECIMAL_ONE = BigDecimal.fromString('1')

export const BIG_INT_ZERO = BigInt.fromI32(0)
export const BIG_INT_ONE = BigInt.fromI32(1)
export const BIG_INT_TWO = BigInt.fromI32(2)
export const BIG_INT_THREE = BigInt.fromI32(3)
export const BIG_INT_FOUR = BigInt.fromI32(4)
export const BIG_INT_FIVE = BigInt.fromI32(5)

export const BIG_INT_PERCENT_BASE = BigInt.fromI32(100)
export const BIG_INT_AUTO_LIQUIDATION_LEVEL = BigInt.fromI32(125)
export const BIG_INT_MARGIN_CALL_LEVEL = BigInt.fromI32(150)
export const BIG_INT_LIQUIDATION_PERCENT = BigInt.fromI32(120)

export const BIG_INT_ONE_MINUTE_IN_SECONDS = BigInt.fromI32(60)
export const BIG_INT_ONE_HOUR_IN_SECONDS = BigInt.fromI32(3600)
export const BIG_INT_ONE_DAY_SECONDS = BigInt.fromI32(86400)
export const BIG_INT_ONE_YEAR_SECONDS = BigInt.fromI32(31536000)

export const BIG_INT_NOTICE_PERIOD = BigInt.fromI32(1209600)
export const BIG_INT_BASIS_POINTS = BigInt.fromI32(10000)