import { ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"
import { TermAdded, ProductTermSupportUpdated } from "../../generated/TermStructure/TermStructure"

export function createTermAddedEvent(numberOfDays: BigInt): TermAdded {
    let mockEvent = newMockEvent()
    let event = new TermAdded(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    )
    event.parameters = new Array()

    let numTest = new ethereum.EventParam("numDays", ethereum.Value.fromUnsignedBigInt(numberOfDays));

    event.parameters.push(numTest)

    return event
}

export function createProductTermSupportUpdatedEvent(
    numDays: BigInt,
    product: Bytes,
    ccy: Bytes,
    isSupported: boolean
): ProductTermSupportUpdated {
    let mockEvent = newMockEvent()
    let event = new ProductTermSupportUpdated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    )

    event.parameters = new Array()
    event.parameters.push(
        new ethereum.EventParam("numDays", ethereum.Value.fromUnsignedBigInt(numDays))
    )
    event.parameters.push(
        new ethereum.EventParam("product", ethereum.Value.fromBytes(product))
    )
    event.parameters.push(
        new ethereum.EventParam("_ccy", ethereum.Value.fromBytes(ccy))
    )
    event.parameters.push(
        new ethereum.EventParam("isSupported", ethereum.Value.fromBoolean(isSupported))
    )

    return event
}