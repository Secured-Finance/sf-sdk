import { Address, ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"
import { CrosschainSettlementRequested, CrosschainSettlementRequestFulfilled } from "../../generated/SettlementEngine/SettlementEngine";

export function createCrosschainSettlementRequestedEvent(
    payer: Address,
    receiver: Address,
    chainId: i32,
    txHash: string,
    requestId: Bytes,
): CrosschainSettlementRequested {
    let mockEvent = newMockEvent();
    let event = new CrosschainSettlementRequested(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    
    const timestamp = event.block.timestamp;

    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("payer", ethereum.Value.fromAddress(payer)));
    event.parameters.push(new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver)));
    event.parameters.push(new ethereum.EventParam("chainId", ethereum.Value.fromI32(chainId)));
    event.parameters.push(new ethereum.EventParam("timestamp", ethereum.Value.fromUnsignedBigInt(timestamp)));
    event.parameters.push(new ethereum.EventParam("txHash", ethereum.Value.fromString(txHash)));
    event.parameters.push(new ethereum.EventParam("requestId", ethereum.Value.fromBytes(requestId)));

    return event
}

export function createCrosschainSettlementRequestFulfilledEvent(
    payer: string,
    receiver: string,
    chainId: i32,
    amount: BigInt,
    timestamp: BigInt,
    txHash: string,
    settlementId: Bytes,
): CrosschainSettlementRequestFulfilled {
    let mockEvent = newMockEvent();
    let event = new CrosschainSettlementRequestFulfilled(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("payer", ethereum.Value.fromString(payer)));
    event.parameters.push(new ethereum.EventParam("receiver", ethereum.Value.fromString(receiver)));
    event.parameters.push(new ethereum.EventParam("chainId", ethereum.Value.fromI32(chainId)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));
    event.parameters.push(new ethereum.EventParam("timestamp", ethereum.Value.fromUnsignedBigInt(timestamp)));
    event.parameters.push(new ethereum.EventParam("txHash", ethereum.Value.fromString(txHash)));
    event.parameters.push(new ethereum.EventParam("requestId", ethereum.Value.fromBytes(settlementId)));

    return event
}
