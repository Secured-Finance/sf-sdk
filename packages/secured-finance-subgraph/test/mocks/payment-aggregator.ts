import { Address, ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"
import { RegisterPayment, RemovePayment, VerifyPayment } from "../../generated/PaymentAggregator/PaymentAggregator";

export function createRegisterPaymentEvent(
    user: Address,
    counterparty: Address,
    currencyIdentifier: Bytes,
    timeSlotIdentifier: Bytes,
    payment0: BigInt,
    payment1: BigInt,
    year: BigInt,
    month: BigInt,
    day: BigInt,
): RegisterPayment {
    let mockEvent = newMockEvent();
    let event = new RegisterPayment(
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
    event.parameters.push(new ethereum.EventParam("timeSlot", ethereum.Value.fromBytes(timeSlotIdentifier)));
    event.parameters.push(new ethereum.EventParam("year", ethereum.Value.fromUnsignedBigInt(year)));
    event.parameters.push(new ethereum.EventParam("month", ethereum.Value.fromUnsignedBigInt(month)));
    event.parameters.push(new ethereum.EventParam("day", ethereum.Value.fromUnsignedBigInt(day)));
    event.parameters.push(new ethereum.EventParam("payment0", ethereum.Value.fromUnsignedBigInt(payment0)));
    event.parameters.push(new ethereum.EventParam("payment1", ethereum.Value.fromUnsignedBigInt(payment1)));

    return event
}

export function createRemovePaymentEvent(
    user: Address,
    counterparty: Address,
    currencyIdentifier: Bytes,
    timeSlotIdentifier: Bytes,
    payment0: BigInt,
    payment1: BigInt,
    year: BigInt,
    month: BigInt,
    day: BigInt,
): RemovePayment {
    let mockEvent = newMockEvent();
    let event = new RemovePayment(
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
    event.parameters.push(new ethereum.EventParam("timeSlot", ethereum.Value.fromBytes(timeSlotIdentifier)));
    event.parameters.push(new ethereum.EventParam("year", ethereum.Value.fromUnsignedBigInt(year)));
    event.parameters.push(new ethereum.EventParam("month", ethereum.Value.fromUnsignedBigInt(month)));
    event.parameters.push(new ethereum.EventParam("day", ethereum.Value.fromUnsignedBigInt(day)));
    event.parameters.push(new ethereum.EventParam("payment0", ethereum.Value.fromUnsignedBigInt(payment0)));
    event.parameters.push(new ethereum.EventParam("payment1", ethereum.Value.fromUnsignedBigInt(payment1)));

    return event
}

export function createVerifyPaymentEvent(
    verifier: Address,
    counterparty: Address,
    currencyIdentifier: Bytes,
    timeSlotIdentifier: Bytes,
    payment: BigInt,
    settlementIdentifier: Bytes,
    year: BigInt,
    month: BigInt,
    day: BigInt,
): VerifyPayment {
    let mockEvent = newMockEvent();
    let event = new VerifyPayment(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("verifier", ethereum.Value.fromAddress(verifier)));
    event.parameters.push(new ethereum.EventParam("counterparty", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier)));
    event.parameters.push(new ethereum.EventParam("timeSlot", ethereum.Value.fromBytes(timeSlotIdentifier)));
    event.parameters.push(new ethereum.EventParam("year", ethereum.Value.fromUnsignedBigInt(year)));
    event.parameters.push(new ethereum.EventParam("month", ethereum.Value.fromUnsignedBigInt(month)));
    event.parameters.push(new ethereum.EventParam("day", ethereum.Value.fromUnsignedBigInt(day)));
    event.parameters.push(new ethereum.EventParam("payment", ethereum.Value.fromUnsignedBigInt(payment)));
    event.parameters.push(new ethereum.EventParam("settlementId", ethereum.Value.fromBytes(settlementIdentifier)));

    return event
}
