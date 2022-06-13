import { Address, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"

import { RegisterProduct } from "../../generated/ProductAddressResolver/ProductAddressResolver"

export function createRegisterProductEvent(
    productPrefix: Bytes,
    productAddress: Address,
    controllerAddress: Address,
): RegisterProduct {
    let mockEvent = newMockEvent();
    let event = new RegisterProduct(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    let prefix = new ethereum.EventParam("prefix", ethereum.Value.fromBytes(productPrefix));
    let product = new ethereum.EventParam("product", ethereum.Value.fromAddress(productAddress));
    let controller = new ethereum.EventParam("controller", ethereum.Value.fromAddress(controllerAddress));
    
    event.parameters.push(prefix);
    event.parameters.push(product);
    event.parameters.push(controller);

    return event
}
