import { Address, BigInt, log, store } from "@graphprotocol/graph-ts"
import { MakeOrder, TakeOrder, CancelOrder } from "../generated/templates/LendingMarket/LendingMarket"
import { LendingMarket, LendingMarketOrderRow, LendingMarketOrder, FilledLendingMarketOrder, LendingMarketController } from "../generated/schema"
import { ADDRESS_ZERO, BIG_INT_ZERO, LENDING_MARKET_CONTROLLER_ADDR, NULL_CALL_RESULT_STRING } from "./constants"
import { increaseLendingControllerLiquidity, reduceAvailableLiquidity } from "./lendingController"

export function getLendingMarket(address: Address): LendingMarket {
    let lendingMarket = LendingMarket.load(address.toHex())

    return lendingMarket as LendingMarket
}

export function createLendingMarketOrderRow(id: string, ccy: i32, side: i32, market: string, term: i32, rate: BigInt, amount: BigInt, time: BigInt, blockNumber: BigInt): LendingMarketOrderRow {
    let marketOrder = new LendingMarketOrderRow(id)

    marketOrder.currency = ccy
    marketOrder.side = side
    if (side == 0) {
        marketOrder.lendMarket = market
        marketOrder.borrowMarket = ''
    } else {
        marketOrder.borrowMarket = market
        marketOrder.lendMarket = ''
    }
    marketOrder.term = term
    marketOrder.rate = rate
    marketOrder.totalAmount = BIG_INT_ZERO

    marketOrder.createdAtTimestamp = time
    marketOrder.createdAtBlockNumber = blockNumber

    return marketOrder as LendingMarketOrderRow
}

export function getLendingMarketOrderRow(id: string, ccy: i32, side: i32, market: string, term: i32, rate: BigInt, amount: BigInt, time: BigInt, blockNumber: BigInt): LendingMarketOrderRow {
    let marketOrder = LendingMarketOrderRow.load(id)

    if (marketOrder === null) {
        marketOrder = createLendingMarketOrderRow(id, ccy, side, market, term, rate, amount, time, blockNumber)
    }

    return marketOrder as LendingMarketOrderRow
}

export function getLendingMarketOrder(id: string, market: string, ccy: i32, side: i32, term: i32, rate: BigInt, amount: BigInt, makerAddr: Address, deadline: BigInt, time: BigInt, blockNumber: BigInt): LendingMarketOrder {
    let lendingOrder = LendingMarketOrder.load(id)

    if (lendingOrder === null) {
        lendingOrder = createLendingMarketOrder(id, market, ccy, side, term, rate, amount, makerAddr, deadline, time, blockNumber)
    }

    return lendingOrder as LendingMarketOrder
}

export function createLendingMarketOrder(id: string, market: string, ccy: i32, side: i32, term: i32, rate: BigInt, amount: BigInt, makerAddr: Address, deadline: BigInt, time: BigInt, blockNumber: BigInt): LendingMarketOrder {
    let orderItem = new LendingMarketOrder(id)

    orderItem.currency = ccy
    orderItem.side = side

    if (side == 0) {
        orderItem.lendingMarket = market
        orderItem.borrowingMarket = ''
        orderItem.cancelMarket = ''
    } else {
        orderItem.borrowingMarket = market
        orderItem.lendingMarket = ''
        orderItem.cancelMarket = ''
    }

    orderItem.term = term
    orderItem.rate = rate
    orderItem.amount = amount
    orderItem.maker = makerAddr
    orderItem.makerUser = makerAddr.toHex()
    orderItem.deadline = deadline

    orderItem.createdAtTimestamp = time
    orderItem.createdAtBlockNumber = blockNumber
    orderItem.updatedAtTimestamp = BIG_INT_ZERO
    orderItem.updatedAtBlockNumber = BIG_INT_ZERO

    return orderItem as LendingMarketOrder
}

export function handleMakeLendingOrder(event: MakeOrder): void {
    let lendingMarket = LendingMarket.load(event.transaction.to.toHexString())

    lendingMarket.totalLiquidity = lendingMarket.totalLiquidity.plus(event.params.amount)
    lendingMarket.totalAvailableLiquidity = lendingMarket.totalAvailableLiquidity.plus(event.params.amount)

    increaseLendingControllerLiquidity(event.params.ccy, event.params.amount)

    lendingMarket.orderCount = lendingMarket.orderCount + 1
    lendingMarket.save()

    let rowId = BigInt.fromI32(event.params.ccy).toString().concat('-').concat(BigInt.fromI32(event.params.side).toString()).concat('-').concat(BigInt.fromI32(event.params.term).toString()).concat('-').concat(event.params.rate.toString())

    let marketOrderRow = getLendingMarketOrderRow(
        rowId,
        event.params.ccy,
        event.params.side,
        event.transaction.to.toHex(),
        event.params.term,
        event.params.rate,
        event.params.amount,
        event.block.timestamp,
        event.block.number
    )
    marketOrderRow.totalAmount = marketOrderRow.totalAmount.plus(event.params.amount)
    marketOrderRow.save()

    let orderId = event.transaction.to.toHexString().concat('-').concat(event.params.orderId.toString())

    let orderItem = getLendingMarketOrder(
        orderId,
        event.transaction.to.toHex(),
        event.params.ccy,
        event.params.side,
        event.params.term,
        event.params.rate,
        event.params.amount,
        event.params.maker,
        event.params.deadline,
        event.block.timestamp,
        event.block.number
    )
    orderItem.row = rowId

    orderItem.save()
}

export function handleTakeLendingOrder(event: TakeOrder): void {
    let lendingMarket = LendingMarket.load(event.transaction.to.toHex())

    let orderId = event.transaction.to.toHexString().concat('-').concat(event.params.orderId.toString())
    let orderItem = LendingMarketOrder.load(orderId)
    orderItem.amount = orderItem.amount.minus(event.params.amount)
    lendingMarket.totalAvailableLiquidity = lendingMarket.totalAvailableLiquidity.minus(event.params.amount)

    reduceAvailableLiquidity(orderItem.currency, event.params.amount)

    let filledId = event.params.orderId.toString().concat("-").concat(event.params.amount.toString())

    let filledOrder = new FilledLendingMarketOrder(filledId)
    filledOrder.orderId = event.params.orderId
    filledOrder.amount = event.params.amount
    filledOrder.currency = orderItem.currency
    filledOrder.side = event.params.side
    filledOrder.term = orderItem.term
    filledOrder.rate = event.params.rate

    filledOrder.taker = event.params.taker
    filledOrder.takerUser = event.params.taker.toHex()
    filledOrder.maker = orderItem.maker
    filledOrder.makerUser = orderItem.makerUser

    if (orderItem.side == 0) {
        filledOrder.market = event.transaction.to.toHex()
    } else {
        filledOrder.market = event.transaction.to.toHex()
    }

    filledOrder.createdAtTimestamp = event.block.timestamp
    filledOrder.createdAtBlockNumber = event.block.number

    orderItem.updatedAtTimestamp = event.block.timestamp
    orderItem.updatedAtBlockNumber = event.block.number

    let rowId = BigInt.fromI32(orderItem.currency).toString().concat('-').concat(BigInt.fromI32(event.params.side).toString()).concat('-').concat(BigInt.fromI32(orderItem.term).toString()).concat('-').concat(event.params.rate.toString())
    let marketOrderRow = LendingMarketOrderRow.load(rowId)
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

export function handleCancelLendingOrder(event: CancelOrder): void {
    let lendingMarket = LendingMarket.load(event.transaction.to.toHex())

    let orderId = event.transaction.to.toHexString().concat('-').concat(event.params.orderId.toString())
    let orderItem = LendingMarketOrder.load(orderId)
    reduceAvailableLiquidity(orderItem.currency, event.params.amount)

    orderItem.cancelMarket = event.transaction.to.toHex()
    orderItem.lendingMarket = NULL_CALL_RESULT_STRING
    orderItem.borrowingMarket = NULL_CALL_RESULT_STRING

    let rowId = BigInt.fromI32(orderItem.currency).toString().concat('-').concat(BigInt.fromI32(event.params.side).toString()).concat('-').concat(BigInt.fromI32(orderItem.term).toString()).concat('-').concat(event.params.rate.toString())
    let marketOrderRow = LendingMarketOrderRow.load(rowId)
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