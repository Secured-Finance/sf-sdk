import { Address, BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as/assembly/index';
import {
    CancelOrder,
    MakeOrder,
    TakeOrder,
} from '../../generated/templates/LendingMarket/LendingMarket';

export function createMakeOrderEvent(
    orderId: BigInt,
    maker: Address,
    side: i32,
    ccy: Bytes,
    term: BigInt,
    amount: BigInt,
    rate: BigInt
): MakeOrder {
    let mockEvent = newMockEvent();
    let event = new MakeOrder(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters
    );
    event.parameters = new Array();

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
        new ethereum.EventParam('term', ethereum.Value.fromUnsignedBigInt(term))
    );
    event.parameters.push(
        new ethereum.EventParam(
            'amount',
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    );
    event.parameters.push(
        new ethereum.EventParam('rate', ethereum.Value.fromUnsignedBigInt(rate))
    );

    return event;
}

export function createTakeOrderEvent(
    orderId: BigInt,
    taker: Address,
    side: i32,
    amount: BigInt,
    rate: BigInt
): TakeOrder {
    let mockEvent = newMockEvent();
    let event = new TakeOrder(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters
    );
    event.parameters = new Array();

    event.parameters.push(
        new ethereum.EventParam(
            'orderId',
            ethereum.Value.fromUnsignedBigInt(orderId)
        )
    );
    event.parameters.push(
        new ethereum.EventParam('taker', ethereum.Value.fromAddress(taker))
    );
    event.parameters.push(
        new ethereum.EventParam('side', ethereum.Value.fromI32(side))
    );
    event.parameters.push(
        new ethereum.EventParam(
            'amount',
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    );
    event.parameters.push(
        new ethereum.EventParam('rate', ethereum.Value.fromUnsignedBigInt(rate))
    );

    return event;
}

export function createCancelOrderEvent(
    orderId: BigInt,
    maker: Address,
    side: i32,
    amount: BigInt,
    rate: BigInt
): CancelOrder {
    let mockEvent = newMockEvent();
    let event = new CancelOrder(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters
    );
    event.parameters = new Array();

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
        new ethereum.EventParam(
            'amount',
            ethereum.Value.fromUnsignedBigInt(amount)
        )
    );
    event.parameters.push(
        new ethereum.EventParam('rate', ethereum.Value.fromUnsignedBigInt(rate))
    );

    return event;
}
