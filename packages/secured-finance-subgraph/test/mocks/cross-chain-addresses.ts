import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"
import { UpdateAddress } from "../../generated/CrosschainAddressResolver/CrosschainAddressResolver";

export function createUpdateCrosschainAddressEvent(
    user: Address,
    chainId: BigInt,
    crosschainAddress: string,
): UpdateAddress {
    let mockEvent = newMockEvent();
    let event = new UpdateAddress(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("_user", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("_chainId", ethereum.Value.fromUnsignedBigInt(chainId)));
    event.parameters.push(new ethereum.EventParam("_address", ethereum.Value.fromString(crosschainAddress)));

    return event
}
