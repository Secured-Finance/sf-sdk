import { assert, logStore, test } from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt, log, bigInt } from "@graphprotocol/graph-ts"

import { createMakeOrderEvent, createTakeOrderEvent, createCancelOrderEvent } from "./mocks/lending-market"
import { handleCancelLendingOrder, handleMakeLendingOrder, handleTakeLendingOrder } from "../src/lendingMarket"
import { toBytes32 } from "./utils/string"
import { createCurrencyEntity } from "./utils/entities"
import { createLendingMarketCreatedEvent } from "./mocks/lending-controller"
import { handleNewLendingMarket } from "../src/lendingController"
export { handleCancelLendingOrder, handleMakeLendingOrder, handleTakeLendingOrder, handleNewLendingMarket }

const user = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');
const lendingMarketAddress = Address.fromString('0x90E703941B56eDEAdD16EB6780C55184214Fd06C');
const counterparty = Address.fromString('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');

const currencyShortName = 'ETH';
const currencyIdentifier = toBytes32(currencyShortName);
const termDays = BigInt.fromI32(730);
const notional = BigInt.fromI32(100000);
const rate = BigInt.fromI32(700);
const orderId = BigInt.fromI32(1);
const secondOrderId = BigInt.fromI32(2);
const lendingOrderId = lendingMarketAddress.toHex() + '-' + orderId.toString()
const orderRowId = currencyShortName + '-' + '0' + '-' + termDays.toString() + '-' + rate.toString();

test("Should create new lending market, and make first order", () => {
    createCurrencyEntity(
        currencyIdentifier,
        'Ethereum',
        currencyShortName,
        60
    )

    let event0 = createLendingMarketCreatedEvent(
        currencyIdentifier,
        termDays,
        lendingMarketAddress
    );
    handleNewLendingMarket(event0)

    let event1 = createMakeOrderEvent(
        orderId,
        user,
        0,
        currencyIdentifier,
        termDays,
        notional,
        rate
    );
    event1.address = lendingMarketAddress
    handleMakeLendingOrder(event1)

    assert.fieldEquals(
        'LendingMarketOrder',
        lendingOrderId,
        'rate',
        rate.toString()
    )

    assert.fieldEquals(
        'LendingMarketOrder',
        lendingOrderId,
        'amount',
        notional.toString()
    )

    assert.fieldEquals(
        'LendingMarketOrder',
        lendingOrderId,
        'maker',
        user.toHex()
    )

    assert.fieldEquals(
        'LendingMarketOrderRow',
        orderRowId,
        'totalAmount',
        notional.toString()
    )
})

test("Should take first order and validate the state changes", () => {
    const amount = BigInt.fromI32(35000);

    let event = createTakeOrderEvent(
        orderId,
        counterparty,
        0,
        amount,
        rate
    );
    event.address = lendingMarketAddress

    handleTakeLendingOrder(event)

    assert.fieldEquals(
        'LendingMarketOrder',
        lendingOrderId,
        'amount',
        (notional.minus(amount)).toString()
    )

    const filledOrderId = lendingMarketAddress.toHex() + '-' + orderId.toString() + '-' + amount.toString()

    assert.fieldEquals(
        'FilledLendingMarketOrder',
        filledOrderId,
        'amount',
        amount.toString()
    )

    assert.fieldEquals(
        'FilledLendingMarketOrder',
        filledOrderId,
        'taker',
        counterparty.toHex()
    )

    assert.fieldEquals(
        'FilledLendingMarketOrder',
        filledOrderId,
        'maker',
        user.toHex()
    )

    assert.fieldEquals(
        'LendingMarketOrderRow',
        orderRowId,
        'totalAmount',
        (notional.minus(amount)).toString()
    )
});

test("Should take the rest amount of the first order and validate that first order is not in store", () => {
    const amount = BigInt.fromI32(65000);
    let event = createTakeOrderEvent(
        orderId,
        counterparty,
        0,
        amount,
        rate
    );
    event.address = lendingMarketAddress

    handleTakeLendingOrder(event)

    assert.notInStore('LendingMarketOrder', lendingOrderId)
    assert.notInStore('LendingMarketOrderRow', orderRowId)

    const filledOrderId = lendingMarketAddress.toHex() + '-' + orderId.toString() + '-' + amount.toString()

    assert.fieldEquals(
        'FilledLendingMarketOrder',
        filledOrderId,
        'amount',
        amount.toString()
    )

    assert.fieldEquals(
        'FilledLendingMarketOrder',
        filledOrderId,
        'taker',
        counterparty.toHex()
    )

    assert.fieldEquals(
        'FilledLendingMarketOrder',
        filledOrderId,
        'maker',
        user.toHex()
    )
});

test("Should create the second order, cancel it right away and validate the state", () => {
    const amount = BigInt.fromI32(50000);
    const lendingOrderId = lendingMarketAddress.toHex() + '-' + secondOrderId.toString()
    const orderRowId = currencyShortName + '-' + '1' + '-' + termDays.toString() + '-' + rate.toString();

    let event = createMakeOrderEvent(
        secondOrderId,
        counterparty,
        1,
        currencyIdentifier,
        termDays,
        amount,
        rate
    );
    event.address = lendingMarketAddress
    handleMakeLendingOrder(event)

    assert.fieldEquals(
        'LendingMarketOrder',
        lendingOrderId,
        'orderState',
        'ACTIVE'
    )

    assert.fieldEquals(
        'LendingMarketOrderRow',
        orderRowId,
        'totalAmount',
        amount.toString()
    )

    let event1 = createCancelOrderEvent(secondOrderId, counterparty, 1, amount, rate)
    event1.address = lendingMarketAddress
    handleCancelLendingOrder(event1)

    assert.fieldEquals(
        'LendingMarketOrder',
        lendingOrderId,
        'orderState',
        'CANCELED'
    )
});