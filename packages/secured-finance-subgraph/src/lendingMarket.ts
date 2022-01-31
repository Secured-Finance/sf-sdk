import { Address, BigInt, Bytes, log, store } from "@graphprotocol/graph-ts"
import { MakeOrder, TakeOrder, CancelOrder } from "../generated/templates/LendingMarket/LendingMarket"
import { LendingMarket, LendingMarketOrderRow, LendingMarketOrder, FilledLendingMarketOrder, LendingMarketController } from "../generated/schema"
import { ADDRESS_ZERO, BIG_INT_ZERO, LENDING_MARKET_CONTROLLER_ADDR, NULL_CALL_RESULT_STRING } from "./constants"
import { increaseLendingControllerLiquidity, reduceAvailableLiquidity } from "./lendingController"

export function getLendingMarket(address: Address): LendingMarket {
    let lendingMarket = LendingMarket.load(address.toHex())

    return lendingMarket as LendingMarket
}

export function createLendingMarketOrderRow(id: string, ccy: Bytes, side: i32, market: Bytes, term: BigInt, rate: BigInt, amount: BigInt, time: BigInt, blockNumber: BigInt): LendingMarketOrderRow {
    let marketOrder = new LendingMarketOrderRow(id)

    marketOrder.currency = ccy
    marketOrder.side = side
    marketOrder.marketAddr = market
    if (side == 0) {
        marketOrder.lendMarket = market.toHex()
        marketOrder.borrowMarket = ''
    } else {
        marketOrder.borrowMarket = market.toHex()
        marketOrder.lendMarket = ''
    }
    marketOrder.term = term
    marketOrder.rate = rate
    marketOrder.totalAmount = BIG_INT_ZERO

    marketOrder.createdAtTimestamp = time
    marketOrder.createdAtBlockNumber = blockNumber

    return marketOrder as LendingMarketOrderRow
}

export function getLendingMarketOrderRow(id: string, ccy: Bytes, side: i32, market: Bytes, term: BigInt, rate: BigInt, amount: BigInt, time: BigInt, blockNumber: BigInt): LendingMarketOrderRow {
    let marketOrder = LendingMarketOrderRow.load(id)

    if (marketOrder === null) {
        marketOrder = createLendingMarketOrderRow(id, ccy, side, market, term, rate, amount, time, blockNumber)
    }

    return marketOrder as LendingMarketOrderRow
}

export function getLendingMarketOrder(id: string, orderId: BigInt, market: Bytes, ccy: Bytes, side: i32, term: BigInt, rate: BigInt, amount: BigInt, makerAddr: Address, time: BigInt, blockNumber: BigInt): LendingMarketOrder {
    let lendingOrder = LendingMarketOrder.load(id)

    if (lendingOrder === null) {
        lendingOrder = createLendingMarketOrder(id, orderId, market, ccy, side, term, rate, amount, makerAddr, time, blockNumber)
    }

    return lendingOrder as LendingMarketOrder
}

export function createLendingMarketOrder(id: string, orderId: BigInt, market: Bytes, ccy: Bytes, side: i32, term: BigInt, rate: BigInt, amount: BigInt, makerAddr: Address, time: BigInt, blockNumber: BigInt): LendingMarketOrder {
    let orderItem = new LendingMarketOrder(id)

    orderItem.currency = ccy
    orderItem.orderId = orderId
    orderItem.marketAddr = market
    orderItem.side = side

    if (side == 0) {
        orderItem.lendingMarket = market.toHex()
        orderItem.borrowingMarket = ''
        orderItem.cancelMarket = ''
    } else {
        orderItem.borrowingMarket = market.toHex()
        orderItem.lendingMarket = ''
        orderItem.cancelMarket = ''
    }

    orderItem.term = term
    orderItem.rate = rate
    orderItem.amount = amount
    orderItem.maker = makerAddr
    orderItem.makerUser = makerAddr.toHex()

    orderItem.createdAtTimestamp = time
    orderItem.createdAtBlockNumber = blockNumber
    orderItem.updatedAtTimestamp = BIG_INT_ZERO
    orderItem.updatedAtBlockNumber = BIG_INT_ZERO

    return orderItem as LendingMarketOrder
}

export function handleMakeLendingOrder(event: MakeOrder): void {
    let marketAddr = event.address.toHexString()
    let lendingMarket = LendingMarket.load(marketAddr)

    if (lendingMarket) {
        lendingMarket.totalLiquidity = lendingMarket.totalLiquidity.plus(event.params.amount)
        lendingMarket.totalAvailableLiquidity = lendingMarket.totalAvailableLiquidity.plus(event.params.amount)
    
        increaseLendingControllerLiquidity(event.params.ccy, event.params.amount)
    
        lendingMarket.orderCount = lendingMarket.orderCount + 1
        lendingMarket.save()

        let rowId = event.params.ccy.toString().concat('-').concat(BigInt.fromI32(event.params.side).toString()).concat('-').concat(event.params.term.toString()).concat('-').concat(event.params.rate.toString())

        let marketOrderRow = getLendingMarketOrderRow(
            rowId,
            event.params.ccy,
            event.params.side,
            lendingMarket.marketAddr,
            event.params.term,
            event.params.rate,
            event.params.amount,
            event.block.timestamp,
            event.block.number
        )
    
        if (marketOrderRow) {
            marketOrderRow.totalAmount = marketOrderRow.totalAmount.plus(event.params.amount)
            marketOrderRow.save()    
        }
    
        let orderId = lendingMarket.marketAddr.toHexString().concat('-').concat(event.params.orderId.toString())
    
        let orderItem = getLendingMarketOrder(
            orderId,
            event.params.orderId,
            lendingMarket.marketAddr,
            event.params.ccy,
            event.params.side,
            event.params.term,
            event.params.rate,
            event.params.amount,
            event.params.maker,
            event.block.timestamp,
            event.block.number
        )
        orderItem.row = rowId
    
        orderItem.save()
    }
}

export function handleTakeLendingOrder(event: TakeOrder): void {
    let lendingMarket = LendingMarket.load(event.address.toHex())

    if (lendingMarket) {
        let orderId = lendingMarket.marketAddr.toHexString().concat('-').concat(event.params.orderId.toString())
        let orderItem = LendingMarketOrder.load(orderId)
        
        if (orderItem) {
            orderItem.amount = orderItem.amount.minus(event.params.amount)
            lendingMarket.totalAvailableLiquidity = lendingMarket.totalAvailableLiquidity.minus(event.params.amount)

            reduceAvailableLiquidity(orderItem.currency, event.params.amount)

            let filledId = event.params.orderId.toString().concat("-").concat(event.params.amount.toString())

            let filledOrder = new FilledLendingMarketOrder(filledId)
            filledOrder.orderId = event.params.orderId
            filledOrder.marketAddr = lendingMarket.marketAddr
            filledOrder.amount = event.params.amount
            filledOrder.currency = orderItem.currency
            filledOrder.side = event.params.side
            filledOrder.term = orderItem.term
            filledOrder.rate = event.params.rate

            filledOrder.taker = event.params.taker
            filledOrder.takerUser = event.params.taker.toHex()
            filledOrder.maker = orderItem.maker
            filledOrder.makerUser = orderItem.makerUser

            filledOrder.market = lendingMarket.marketAddr.toHex()

            filledOrder.createdAtTimestamp = event.block.timestamp
            filledOrder.createdAtBlockNumber = event.block.number

            orderItem.updatedAtTimestamp = event.block.timestamp
            orderItem.updatedAtBlockNumber = event.block.number

            let rowId = orderItem.currency.toString().concat('-').concat(BigInt.fromI32(event.params.side).toString()).concat('-').concat(orderItem.term.toString()).concat('-').concat(event.params.rate.toString())
            
            let marketOrderRow = LendingMarketOrderRow.load(rowId)

            if (marketOrderRow) {
                marketOrderRow.totalAmount = marketOrderRow.totalAmount.minus(event.params.amount)

                lendingMarket.save()
                filledOrder.save()
                marketOrderRow.save()
                orderItem.save()

                if (orderItem.amount == BIG_INT_ZERO) {
                    store.remove('LendingMarketOrder', orderItem.id)
                }

                if (marketOrderRow.totalAmount == BIG_INT_ZERO) {
                    store.remove('LendingMarketOrderRow', marketOrderRow.id)
                }
            }
        }
    }
}

export function handleCancelLendingOrder(event: CancelOrder): void {
    let lendingMarket = LendingMarket.load(event.address.toHex())
    
    if (lendingMarket) {
        let orderId = lendingMarket.marketAddr.toHexString().concat('-').concat(event.params.orderId.toString())
        let orderItem = LendingMarketOrder.load(orderId)

        if (orderItem) {
            reduceAvailableLiquidity(orderItem.currency, event.params.amount)

            orderItem.cancelMarket = lendingMarket.marketAddr.toHex()
            orderItem.lendingMarket = NULL_CALL_RESULT_STRING
            orderItem.borrowingMarket = NULL_CALL_RESULT_STRING

            let rowId = orderItem.currency.toString().concat('-').concat(BigInt.fromI32(event.params.side).toString()).concat('-').concat(orderItem.term.toString()).concat('-').concat(event.params.rate.toString())
            
            let marketOrderRow = LendingMarketOrderRow.load(rowId)

            if (marketOrderRow) {
                marketOrderRow.totalAmount = marketOrderRow.totalAmount.minus(event.params.amount)
                lendingMarket.totalAvailableLiquidity = lendingMarket.totalAvailableLiquidity.minus(event.params.amount)
                orderItem.row = ''

                lendingMarket.save()

                if (orderItem.amount == BIG_INT_ZERO) {
                    store.remove('LendingMarketOrder', orderItem.id)
                } else {
                    orderItem.save()
                }

                if (marketOrderRow.totalAmount == BIG_INT_ZERO) {
                    store.remove('LendingMarketOrderRow', marketOrderRow.id)
                } else {
                    marketOrderRow.save()
                }
            }
        }
    }
}