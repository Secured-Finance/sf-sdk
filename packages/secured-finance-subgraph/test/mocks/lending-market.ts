/* eslint-disable @typescript-eslint/ban-types */
import { Address, BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as/assembly/index';
import {
    CancelOrder,
    CleanOrders,
    MakeOrder,
    TakeOrders,
} from '../../generated/templates/LendingMarket/LendingMarket';

export function createMakeOrderEvent(
    orderId: BigInt,
    originalOrderId: BigInt,
    maker: Address,
    side: i32,
    ccy: Bytes,
    maturity: BigInt,
    amount: BigInt,
    unitPrice: BigInt
): MakeOrder {
    const mockEvent = newMockEvent();
    const event = new MakeOrder(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters
    );
    event.parameters = [];

    event.parameters.push(
        new ethereum.EventParam(
            'orderId',
            ethereum.Value.fromUnsignedBigInt(orderId)
        )
    );
    event.parameters.push(
        new ethereum.EventParam(
            'originalOrderId',
            ethereum.Value.fromUnsignedBigInt(originalOrderId)
        )
    );
    event.parameters.push(
        new ethereum.EventParam('maker', ethereum.Value.fromAddress(maker))
    );
    event.parameters.push(
        new ethereum.EventParam('side', ethereum.Value.fromI32(side))
    );
    event.parameters.push(
        new ethereum.EventParam('ccy', ethereum.Value.fromBytes(ccy))
    );
    event.parameters.push(
        new ethereum.EventParam(
            'maturity',
            ethereum.Value.fromUnsignedBigInt(maturity)
        )
    );
    event.parameters.push(
        new ethereum.EventParam(
            'amount',
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    );
    event.parameters.push(
        new ethereum.EventParam(
            'unitPrice',
            ethereum.Value.fromUnsignedBigInt(unitPrice)
        )
    );

    return event;
}

export function createTakeOrdersEvent(
    taker: Address,
    side: i32,
    ccy: Bytes,
    maturity: BigInt,
    filledAmount: BigInt,
    unitPrice: BigInt,
    filledFutureValue: BigInt
): TakeOrders {
    const mockEvent = newMockEvent();
    const event = new TakeOrders(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters
    );
    event.parameters = [];

    event.parameters.push(
        new ethereum.EventParam('taker', ethereum.Value.fromAddress(taker))
    );
    event.parameters.push(
        new ethereum.EventParam('side', ethereum.Value.fromI32(side))
    );
    event.parameters.push(
        new ethereum.EventParam('ccy', ethereum.Value.fromBytes(ccy))
    );
    event.parameters.push(
        new ethereum.EventParam(
            'maturity',
            ethereum.Value.fromUnsignedBigInt(maturity)
        )
    );
    event.parameters.push(
        new ethereum.EventParam(
            'filledAmount',
            ethereum.Value.fromUnsignedBigInt(filledAmount)
        )
    );
    event.parameters.push(
        new ethereum.EventParam(
            'unitPrice',
            ethereum.Value.fromUnsignedBigInt(unitPrice)
        )
    );
    event.parameters.push(
        new ethereum.EventParam(
            'filledFutureValue',
            ethereum.Value.fromUnsignedBigInt(filledFutureValue)
        )
    );

    return event;
}

export function createCancelOrderEvent(
    orderId: BigInt,
    maker: Address,
    side: i32,
    ccy: Bytes,
    maturity: BigInt,
    amount: BigInt,
    unitPrice: BigInt
): CancelOrder {
    const mockEvent = newMockEvent();
    const event = new CancelOrder(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters
    );
    event.parameters = [];

    event.parameters.push(
        new ethereum.EventParam(
            'orderId',
            ethereum.Value.fromUnsignedBigInt(orderId)
        )
    );
    event.parameters.push(
        new ethereum.EventParam('maker', ethereum.Value.fromAddress(maker))
    );
    event.parameters.push(
        new ethereum.EventParam('side', ethereum.Value.fromI32(side))
    );
    event.parameters.push(
        new ethereum.EventParam('ccy', ethereum.Value.fromBytes(ccy))
    );
    event.parameters.push(
        new ethereum.EventParam(
            'maturity',
            ethereum.Value.fromUnsignedBigInt(maturity)
        )
    );
    event.parameters.push(
        new ethereum.EventParam(
            'amount',
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    );
    event.parameters.push(
        new ethereum.EventParam(
            'unitPrice',
            ethereum.Value.fromUnsignedBigInt(unitPrice)
        )
    );

    return event;
}

export function createCleanOrders(
    orderIds: Array<BigInt>,
    maker: Address,
    side: i32,
    ccy: Bytes,
    maturity: BigInt
): CleanOrders {
    const mockEvent = newMockEvent();
    const event = new CleanOrders(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters
    );
    event.parameters = [];

    event.parameters.push(
        new ethereum.EventParam(
            'orderIds',
            ethereum.Value.fromUnsignedBigIntArray(orderIds)
        )
    );
    event.parameters.push(
        new ethereum.EventParam('maker', ethereum.Value.fromAddress(maker))
    );
    event.parameters.push(
        new ethereum.EventParam('side', ethereum.Value.fromI32(side))
    );
    event.parameters.push(
        new ethereum.EventParam('ccy', ethereum.Value.fromBytes(ccy))
    );
    event.parameters.push(
        new ethereum.EventParam(
            'maturity',
            ethereum.Value.fromUnsignedBigInt(maturity)
        )
    );

    return event;
}
