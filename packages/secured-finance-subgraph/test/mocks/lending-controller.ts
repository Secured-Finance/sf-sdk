import { Address, ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"
import { LendingMarketCreated } from "../../generated/LendingMarketController/LendingMarketController";

export function createLendingMarketCreatedEvent(
    currencyIdentifier: Bytes,
    term: BigInt,
    lendingMarketAddress: Address,
): LendingMarketCreated {
    let mockEvent = newMockEvent();
    let event = new LendingMarketCreated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier)));
    event.parameters.push(new ethereum.EventParam("term", ethereum.Value.fromUnsignedBigInt(term)));
    event.parameters.push(new ethereum.EventParam("marketAddr", ethereum.Value.fromAddress(lendingMarketAddress)));

    return event
}
