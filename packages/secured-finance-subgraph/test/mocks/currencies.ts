import { Address, ethereum, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"

import { CcyAdded, CcyCollateralUpdate, CcySupportUpdate, LTVUpdated, MinMarginUpdated, PriceFeedAdded, PriceFeedRemoved } from "../../generated/CurrencyController/CurrencyController"

export function createCcyAddedEvent(
    currencyIdentifier: Bytes,
    currencyFullName: string,
    chainId: i32,
    ltv: BigInt,
): CcyAdded {
    let mockEvent = newMockEvent();
    let event = new CcyAdded(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    let ccy = new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier));
    let ccyName = new ethereum.EventParam("name", ethereum.Value.fromString(currencyFullName));
    let ccyChainId = new ethereum.EventParam("controller", ethereum.Value.fromI32(chainId));
    let ccyLTV = new ethereum.EventParam("ltv", ethereum.Value.fromUnsignedBigInt(ltv));
    
    event.parameters.push(ccy);
    event.parameters.push(ccyName);
    event.parameters.push(ccyChainId);
    event.parameters.push(ccyLTV);

    return event
}

export function createLTVUpdatedEvent(
    currencyIdentifier: Bytes,
    ltv: BigInt,
): LTVUpdated {
    let mockEvent = newMockEvent();
    let event = new LTVUpdated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    let ccy = new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier));
    let ccyLTV = new ethereum.EventParam("ltv", ethereum.Value.fromUnsignedBigInt(ltv));
    
    event.parameters.push(ccy);
    event.parameters.push(ccyLTV);

    return event
}

export function createMinMarginUpdatedEvent(
    currencyIdentifier: Bytes,
    minMargin: BigInt,
): MinMarginUpdated {
    let mockEvent = newMockEvent();
    let event = new MinMarginUpdated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    let ccy = new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier));
    let ccyMinMargin = new ethereum.EventParam("minMargin", ethereum.Value.fromUnsignedBigInt(minMargin));
    
    event.parameters.push(ccy);
    event.parameters.push(ccyMinMargin);

    return event
}

export function createCcySupportUpdateEvent(
    currencyIdentifier: Bytes,
    isSupported: boolean,
): CcySupportUpdate {
    let mockEvent = newMockEvent();
    let event = new CcySupportUpdate(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    let ccy = new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier));
    let ccySupport = new ethereum.EventParam("isSupported", ethereum.Value.fromBoolean(isSupported));
    
    event.parameters.push(ccy);
    event.parameters.push(ccySupport);

    return event
}

export function createCcyCollateralUpdateEvent(
    currencyIdentifier: Bytes,
    isCollateral: boolean,
): CcyCollateralUpdate {
    let mockEvent = newMockEvent();
    let event = new CcyCollateralUpdate(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    let ccy = new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier));
    let isCcyCollateral = new ethereum.EventParam("isCollateral", ethereum.Value.fromBoolean(isCollateral));
    
    event.parameters.push(ccy);
    event.parameters.push(isCcyCollateral);

    return event
}

export function createPriceFeedAddedEvent(
    currencyIdentifier: Bytes,
    secondCcy: string,
    priceFeed: Address,
): PriceFeedAdded {
    let mockEvent = newMockEvent();
    let event = new PriceFeedAdded(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    let ccy = new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier));
    let secondCcyName = new ethereum.EventParam("secondCcy", ethereum.Value.fromString(secondCcy));
    let ccyPriceFeed = new ethereum.EventParam("priceFeed", ethereum.Value.fromAddress(priceFeed));
    
    event.parameters.push(ccy);
    event.parameters.push(secondCcyName);
    event.parameters.push(ccyPriceFeed);

    return event
}

export function createPriceFeedRemovedEvent(
    currencyIdentifier: Bytes,
    secondCcy: string,
    priceFeed: Address,
): PriceFeedRemoved {
    let mockEvent = newMockEvent();
    let event = new PriceFeedRemoved(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    let ccy = new ethereum.EventParam("ccy", ethereum.Value.fromBytes(currencyIdentifier));
    let secondCcyName = new ethereum.EventParam("secondCcy", ethereum.Value.fromString(secondCcy));
    let ccyPriceFeed = new ethereum.EventParam("priceFeed", ethereum.Value.fromAddress(priceFeed));
    
    event.parameters.push(ccy);
    event.parameters.push(secondCcyName);
    event.parameters.push(ccyPriceFeed);

    return event
}
