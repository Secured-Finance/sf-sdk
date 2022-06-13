import { Address, ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"
import { AddCloseOutPayments, RemoveCloseOutPayments } from "../../generated/CloseOutNetting/CloseOutNetting";

export function createAddCloseOutPaymentsEvent(
    user: Address,
    counterparty: Address,
    currencyIdentifier: Bytes,
    payment0: BigInt,
    payment1: BigInt,
): AddCloseOutPayments {
    let mockEvent = newMockEvent();
    let event = new AddCloseOutPayments(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("party0", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("party1", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier)));
    event.parameters.push(new ethereum.EventParam("payment0", ethereum.Value.fromUnsignedBigInt(payment0)));
    event.parameters.push(new ethereum.EventParam("payment1", ethereum.Value.fromUnsignedBigInt(payment1)));

    return event
}

export function createRemoveCloseOutPaymentsEvent(
    user: Address,
    counterparty: Address,
    currencyIdentifier: Bytes,
    payment0: BigInt,
    payment1: BigInt,
): RemoveCloseOutPayments {
    let mockEvent = newMockEvent();
    let event = new RemoveCloseOutPayments(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("party0", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("party1", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier)));
    event.parameters.push(new ethereum.EventParam("payment0", ethereum.Value.fromUnsignedBigInt(payment0)));
    event.parameters.push(new ethereum.EventParam("payment1", ethereum.Value.fromUnsignedBigInt(payment1)));

    return event
}
