import { Address, BigInt, Bytes, store } from "@graphprotocol/graph-ts";
import { FilledLendingMarketOrder, LendingMarket, LendingMarketOrder, LendingMarketOrderRow } from "../generated/schema";
import { CancelOrder, MakeOrder, TakeOrder } from "../generated/templates/LendingMarket/LendingMarket";
import { getUser } from "./user";

export function getLendingMarket(address: Address): LendingMarket {
    let lendingMarket = LendingMarket.load(address.toHex())

    return lendingMarket as LendingMarket
}

export function createLendingMarketOrderRow(id: string, ccy: Bytes, side: i32, market: Bytes, term: BigInt, rate: BigInt, amount: BigInt, time: BigInt, blockNumber: BigInt): LendingMarketOrderRow {
    let marketOrder = new LendingMarketOrderRow(id)

    marketOrder.currency = ccy.toHexString()
    marketOrder.currencyIdentifier = ccy
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
    marketOrder.totalAmount = BigInt.fromI32(0)

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
    const maker = getUser(makerAddr, time)

    orderItem.currency = ccy.toHex()
    orderItem.currencyName = ccy.toString()
    orderItem.orderId = orderId
    orderItem.marketAddr = market
    orderItem.lendingMarket = market.toHex()
    orderItem.side = side
    orderItem.row = ""
    orderItem.term = term
    orderItem.rate = rate
    orderItem.amount = amount
    orderItem.maker = makerAddr
    orderItem.makerUser = maker.id
    orderItem.createdAtTimestamp = time
    orderItem.orderState = 'ACTIVE'
    orderItem.createdAtBlockNumber = blockNumber
    orderItem.updatedAtTimestamp = BigInt.fromI32(0)
    orderItem.updatedAtBlockNumber = BigInt.fromI32(0)

    maker.save()

    return orderItem as LendingMarketOrder
}

export function handleMakeLendingOrder(event: MakeOrder): void {
    let marketAddr = event.address.toHexString()
    let lendingMarket = LendingMarket.load(marketAddr)

    if (lendingMarket) {
        lendingMarket.totalLiquidity = lendingMarket.totalLiquidity.plus(event.params.amount)
        lendingMarket.totalAvailableLiquidity = lendingMarket.totalAvailableLiquidity.plus(event.params.amount)

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

            let filledId = lendingMarket.marketAddr.toHexString().concat('-').concat(event.params.orderId.toString().concat("-").concat(event.params.amount.toString()))

            let filledOrder = new FilledLendingMarketOrder(filledId)
            filledOrder.orderId = event.params.orderId
            filledOrder.marketAddr = lendingMarket.marketAddr
            filledOrder.amount = event.params.amount
            filledOrder.currency = orderItem.currency
            filledOrder.currencyName = orderItem.currencyName
            filledOrder.side = event.params.side
            filledOrder.term = orderItem.term
            filledOrder.rate = event.params.rate

            const taker = getUser(event.params.taker, event.block.timestamp)

            filledOrder.taker = event.params.taker
            filledOrder.takerUser = taker.id
            filledOrder.maker = orderItem.maker
            filledOrder.makerUser = orderItem.makerUser

            taker.save()

            filledOrder.market = lendingMarket.marketAddr.toHex()

            filledOrder.createdAtTimestamp = event.block.timestamp
            filledOrder.createdAtBlockNumber = event.block.number

            orderItem.updatedAtTimestamp = event.block.timestamp
            orderItem.updatedAtBlockNumber = event.block.number

            let rowId = orderItem.currencyName.toString().concat('-').concat(BigInt.fromI32(event.params.side).toString()).concat('-').concat(orderItem.term.toString()).concat('-').concat(event.params.rate.toString())

            let marketOrderRow = LendingMarketOrderRow.load(rowId)

            if (marketOrderRow) {
                marketOrderRow.totalAmount = marketOrderRow.totalAmount.minus(event.params.amount)

                lendingMarket.save()
                filledOrder.save()
                marketOrderRow.save()
                orderItem.save()

                if (orderItem.amount == BigInt.fromI32(0)) {
                    store.remove('LendingMarketOrder', orderItem.id)
                }

                if (marketOrderRow.totalAmount == BigInt.fromI32(0)) {
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
            orderItem.orderState = 'CANCELED'
            let rowId = orderItem.currencyName.concat('-').concat(BigInt.fromI32(event.params.side).toString()).concat('-').concat(orderItem.term.toString()).concat('-').concat(event.params.rate.toString())

            let marketOrderRow = LendingMarketOrderRow.load(rowId)

            if (marketOrderRow) {
                marketOrderRow.totalAmount = marketOrderRow.totalAmount.minus(event.params.amount)
                lendingMarket.totalAvailableLiquidity = lendingMarket.totalAvailableLiquidity.minus(event.params.amount)
                orderItem.row = ''

                lendingMarket.save()

                if (orderItem.amount == BigInt.fromI32(0)) {
                    store.remove('LendingMarketOrder', orderItem.id)
                } else {
                    orderItem.save()
                }

                if (marketOrderRow.totalAmount == BigInt.fromI32(0)) {
                    store.remove('LendingMarketOrderRow', marketOrderRow.id)
                } else {
                    marketOrderRow.save()
                }
            }
        }
    }
}
