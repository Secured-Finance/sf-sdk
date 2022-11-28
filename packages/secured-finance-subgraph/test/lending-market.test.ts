import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts';
import { assert, test } from 'matchstick-as/assembly/index';
import {
    handleCancelOrder,
    handleCleanOrders,
    handleMakeOrder,
    handleTakeOrders,
} from '../src/lending-market';
import {
    createCancelOrderEvent,
    createCleanOrders,
    createMakeOrderEvent,
    createTakeOrdersEvent,
} from './mocks';
import { toBytes32 } from './utils/string';

const originalOrderId = BigInt.fromI32(0);
const maker = Address.zero();
const side = BigInt.fromI32(0).toI32();
const ccy = toBytes32('ETH');
const maturity = BigInt.fromI32(365);
const amount = BigInt.fromI32(100);
const unitPrice = BigInt.fromI32(100);

test('Should create a Order when the MakeOrder Event is raised', () => {
    const orderId = BigInt.fromI32(1);
    const id = orderId.toHexString();

    const event = createMakeOrderEvent(
        orderId,
        originalOrderId,
        maker,
        side,
        ccy,
        maturity,
        amount,
        unitPrice
    );
    handleMakeOrder(event);

    assert.fieldEquals('Order', id, 'orderId', orderId.toString());
    assert.fieldEquals(
        'Order',
        id,
        'originalOrderId',
        originalOrderId.toString()
    );
    assert.fieldEquals('Order', id, 'maker', maker.toHexString());
    assert.fieldEquals('Order', id, 'side', side.toString());
    assert.fieldEquals('Order', id, 'currency', ccy.toHexString());
    assert.fieldEquals('Order', id, 'maturity', maturity.toString());
    assert.fieldEquals('Order', id, 'amount', amount.toString());
    assert.fieldEquals('Order', id, 'unitPrice', unitPrice.toString());
    assert.fieldEquals('Order', id, 'status', 'Open');
});

test('Should update the original order amount when the MakeOrder Event is raised', () => {
    const orderId = BigInt.fromI32(10);
    const id = orderId.toHexString();
    const originalOrderId = BigInt.fromI32(11);
    const originalId = originalOrderId.toHexString();

    const originalEvent = createMakeOrderEvent(
        originalOrderId,
        BigInt.fromI32(0),
        maker,
        side,
        ccy,
        maturity,
        BigInt.fromI32(150),
        unitPrice
    );

    handleMakeOrder(originalEvent);
    assert.fieldEquals('Order', originalId, 'amount', '150');

    const event = createMakeOrderEvent(
        orderId,
        originalOrderId,
        maker,
        side,
        ccy,
        maturity,
        amount,
        unitPrice
    );

    handleMakeOrder(event);

    assert.fieldEquals('Order', id, 'orderId', orderId.toString());
    assert.fieldEquals('Order', originalId, 'amount', '50');
});

test('Should update the Order when the CancelOrder Event is raised', () => {
    const orderId = BigInt.fromI32(2);
    const id = orderId.toHexString();

    const makeOrderEvent = createMakeOrderEvent(
        orderId,
        originalOrderId,
        maker,
        side,
        ccy,
        maturity,
        amount,
        unitPrice
    );
    handleMakeOrder(makeOrderEvent);

    assert.fieldEquals('Order', id, 'status', 'Open');

    const event = createCancelOrderEvent(
        orderId,
        maker,
        side,
        ccy,
        maturity,
        amount,
        unitPrice
    );

    handleCancelOrder(event);

    assert.fieldEquals('Order', id, 'orderId', orderId.toString());
    assert.fieldEquals('Order', id, 'status', 'Cancelled');
});

test('Should updates the orders when the CleanOrders Event is raised', () => {
    const orderId1 = BigInt.fromI32(3);
    const id1 = orderId1.toHexString();
    const orderId2 = BigInt.fromI32(4);
    const id2 = orderId2.toHexString();

    const makeOrderEvent1 = createMakeOrderEvent(
        orderId1,
        originalOrderId,
        maker,
        side,
        ccy,
        maturity,
        amount,
        unitPrice
    );
    handleMakeOrder(makeOrderEvent1);
    const makeOrderEvent2 = createMakeOrderEvent(
        orderId2,
        originalOrderId,
        maker,
        side,
        ccy,
        maturity,
        amount,
        unitPrice
    );
    handleMakeOrder(makeOrderEvent2);

    assert.fieldEquals('Order', id1, 'status', 'Open');
    assert.fieldEquals('Order', id2, 'status', 'Open');

    const event = createCleanOrders(
        [orderId1, orderId2],
        maker,
        side,
        ccy,
        maturity
    );

    handleCleanOrders(event);

    assert.fieldEquals('Order', id1, 'status', 'Filled');
    assert.fieldEquals('Order', id2, 'status', 'Filled');
});

test('Should create a Transaction when the TakeOrders Event is raised', () => {
    const filledFutureValue = BigInt.fromString('1230000000000000000000');
    const filledAmount = BigInt.fromString('1200000000000000000000');

    const averagePrice = filledAmount.divDecimal(
        new BigDecimal(filledFutureValue)
    );

    const takeOrdersEvent = createTakeOrdersEvent(
        maker,
        side,
        ccy,
        maturity,
        filledAmount,
        unitPrice,
        filledFutureValue
    );
    handleTakeOrders(takeOrdersEvent);
    const id = takeOrdersEvent.transaction.hash.toHexString();
    assert.fieldEquals('Transaction', id, 'amount', filledAmount.toString());
    assert.fieldEquals(
        'Transaction',
        id,
        'forwardValue',
        filledFutureValue.toString()
    );
    assert.fieldEquals('Transaction', id, 'orderPrice', unitPrice.toString());
    assert.fieldEquals('Transaction', id, 'currency', ccy.toHexString());
    assert.fieldEquals('Transaction', id, 'maturity', maturity.toString());
    assert.fieldEquals('Transaction', id, 'side', side.toString());
    assert.fieldEquals('Transaction', id, 'taker', maker.toHexString());
    assert.fieldEquals(
        'Transaction',
        id,
        'averagePrice',
        averagePrice.toString()
    );
});
