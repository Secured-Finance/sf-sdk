import { Address, ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"
import {
    Register,
    Liquidate,
    RequestTermination,
    RejectTermination,
    EarlyTermination,
    MarkToMarket,
    Novation,
} from "../../generated/LoanV2/LoanV2";

export function createRegisterLoanEvent(
    lender: Address,
    borrower: Address,
    currencyIdentifier: Bytes,
    term: BigInt,
    notional: BigInt,
    rate: BigInt,
    dealId: Bytes,
): Register {
    let mockEvent = newMockEvent();
    let event = new Register(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("lender", ethereum.Value.fromAddress(lender)));
    event.parameters.push(new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier)));
    event.parameters.push(new ethereum.EventParam("term", ethereum.Value.fromUnsignedBigInt(term)));
    event.parameters.push(new ethereum.EventParam("notional", ethereum.Value.fromUnsignedBigInt(notional)));
    event.parameters.push(new ethereum.EventParam("rate", ethereum.Value.fromUnsignedBigInt(rate)));
    event.parameters.push(new ethereum.EventParam("dealId", ethereum.Value.fromBytes(dealId)));

    return event
}

export function createLiquidateLoanEvent(
    dealId: Bytes,
): Liquidate {
    let mockEvent = newMockEvent();
    let event = new Liquidate(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("dealId", ethereum.Value.fromBytes(dealId)));

    return event
}

export function createRequestLoanTerminationEvent(
    dealId: Bytes,
    requestedBy: Address,
): RequestTermination {
    let mockEvent = newMockEvent();
    let event = new RequestTermination(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("dealId", ethereum.Value.fromBytes(dealId)));
    event.parameters.push(new ethereum.EventParam("requestedBy", ethereum.Value.fromAddress(requestedBy)));

    return event
}

export function createRejectLoanTerminationEvent(
    dealId: Bytes,
    rejectedBy: Address,
): RejectTermination {
    let mockEvent = newMockEvent();
    let event = new RejectTermination(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("dealId", ethereum.Value.fromBytes(dealId)));
    event.parameters.push(new ethereum.EventParam("rejectedBy", ethereum.Value.fromAddress(rejectedBy)));

    return event
}

export function createLoanMarkToMarketEvent(
    dealId: Bytes,
    prevPV: BigInt,
    currPV: BigInt
): MarkToMarket {
    let mockEvent = newMockEvent();
    let event = new MarkToMarket(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("dealId", ethereum.Value.fromBytes(dealId)));
    event.parameters.push(new ethereum.EventParam("prevPV", ethereum.Value.fromUnsignedBigInt(prevPV)));
    event.parameters.push(new ethereum.EventParam("currPV", ethereum.Value.fromUnsignedBigInt(currPV)));

    return event
}

export function createLoanNovationEvent(
    dealId: Bytes,
    currLender: Address,
): Novation {
    let mockEvent = newMockEvent();
    let event = new Novation(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("dealId", ethereum.Value.fromBytes(dealId)));
    event.parameters.push(new ethereum.EventParam("currLender", ethereum.Value.fromAddress(currLender)));

    return event
}

export function createLoanEarlyTerminationEvent(
    dealId: Bytes,
    acceptedBy: Address,
    payment: BigInt
): EarlyTermination {
    let mockEvent = newMockEvent();
    let event = new EarlyTermination(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("dealId", ethereum.Value.fromBytes(dealId)));
    event.parameters.push(new ethereum.EventParam("acceptedBy", ethereum.Value.fromAddress(acceptedBy)));
    event.parameters.push(new ethereum.EventParam("payment", ethereum.Value.fromUnsignedBigInt(payment)));

    return event
}