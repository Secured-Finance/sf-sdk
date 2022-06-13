import { Address, ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"
import {
    AutoLiquidationThresholdUpdated,
    LiquidationPriceUpdated,
    MarginCallThresholdUpdated,
    MinCollateralRatioUpdated,
    Register,
    Release,
    ReleaseUnsettled,
    SettleCollateral,
    UpdatePV,
    UseCollateral,
    UseUnsettledCollateral,
    CollateralVaultLinked,
    CollateralVaultRemoved,
    CollateralUserAdded,
    CollateralUserRemoved,
} from "../../generated/CollateralAggregator/CollateralAggregator";

export function createAutoLiquidationUpdateEvent(
    prevRatio: BigInt,
    ratio: BigInt
): AutoLiquidationThresholdUpdated {
    let mockEvent = newMockEvent();
    let event = new AutoLiquidationThresholdUpdated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("prevRatio", ethereum.Value.fromUnsignedBigInt(prevRatio)));
    event.parameters.push(new ethereum.EventParam("ratio", ethereum.Value.fromUnsignedBigInt(ratio)));

    return event
}

export function createLiquidationPriceUpdateEvent(
    previousPrice: BigInt,
    price: BigInt
): LiquidationPriceUpdated {
    let mockEvent = newMockEvent();
    let event = new LiquidationPriceUpdated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("previousPrice", ethereum.Value.fromUnsignedBigInt(previousPrice)));
    event.parameters.push(new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price)));

    return event
}

export function createMarginCallThresholdUpdateEvent(
    previousRatio: BigInt,
    ratio: BigInt
): MarginCallThresholdUpdated {
    let mockEvent = newMockEvent();
    let event = new MarginCallThresholdUpdated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("previousRatio", ethereum.Value.fromUnsignedBigInt(previousRatio)));
    event.parameters.push(new ethereum.EventParam("ratio", ethereum.Value.fromUnsignedBigInt(ratio)));

    return event
}

export function createMinCollateralRatioUpdateEvent(
    previousRatio: BigInt,
    ratio: BigInt
): MinCollateralRatioUpdated {
    let mockEvent = newMockEvent();
    let event = new MinCollateralRatioUpdated(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("previousRatio", ethereum.Value.fromUnsignedBigInt(previousRatio)));
    event.parameters.push(new ethereum.EventParam("ratio", ethereum.Value.fromUnsignedBigInt(ratio)));

    return event
}

export function createRegisterEvent(addr: Address): Register {
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

    event.parameters.push(new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr)));

    return event
}

export function createUseUnsettledCollateralEvent(
    user: Address,
    ccy: Bytes,
    amount: BigInt
): UseUnsettledCollateral {
    let mockEvent = newMockEvent();
    let event = new UseUnsettledCollateral(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("party", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(ccy)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}

export function createReleaseUnsettledEvent(
    user: Address,
    ccy: Bytes,
    amount: BigInt
): ReleaseUnsettled {
    let mockEvent = newMockEvent();
    let event = new ReleaseUnsettled(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("party", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(ccy)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}

export function createUseCollateralEvent(
    user: Address,
    counterparty: Address,
    ccy: Bytes,
    amount0: BigInt,
    amount1: BigInt,
    isSettled: boolean
): UseCollateral {
    let mockEvent = newMockEvent();
    let event = new UseCollateral(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("partyA", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("partyB", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(ccy)));
    event.parameters.push(new ethereum.EventParam("amount0", ethereum.Value.fromUnsignedBigInt(amount0)));
    event.parameters.push(new ethereum.EventParam("amount1", ethereum.Value.fromUnsignedBigInt(amount1)));
    event.parameters.push(new ethereum.EventParam("isSettled", ethereum.Value.fromBoolean(isSettled)));

    return event
}

export function createReleaseCollateralEvent(
    user: Address,
    counterparty: Address,
    ccy: Bytes,
    amount0: BigInt,
    amount1: BigInt,
    isSettled: boolean
): Release {
    let mockEvent = newMockEvent();
    let event = new Release(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("partyA", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("partyB", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(ccy)));
    event.parameters.push(new ethereum.EventParam("amount0", ethereum.Value.fromUnsignedBigInt(amount0)));
    event.parameters.push(new ethereum.EventParam("amount1", ethereum.Value.fromUnsignedBigInt(amount1)));
    event.parameters.push(new ethereum.EventParam("isSettled", ethereum.Value.fromBoolean(isSettled)));

    return event
}

export function createSettleCollateralEvent(
    user: Address,
    counterparty: Address,
    ccy: Bytes,
    amount0: BigInt,
    amount1: BigInt
): SettleCollateral {
    let mockEvent = newMockEvent();
    let event = new SettleCollateral(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("partyA", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("partyB", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(ccy)));
    event.parameters.push(new ethereum.EventParam("amount0", ethereum.Value.fromUnsignedBigInt(amount0)));
    event.parameters.push(new ethereum.EventParam("amount1", ethereum.Value.fromUnsignedBigInt(amount1)));

    return event
}

export function createUpdatePVEvent(
    user: Address,
    counterparty: Address,
    ccy: Bytes,
    prevPV0: BigInt,
    prevPV1: BigInt,
    currentPV0: BigInt,
    currentPV1: BigInt
): UpdatePV {
    let mockEvent = newMockEvent();
    let event = new UpdatePV(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();
    
    event.parameters.push(new ethereum.EventParam("partyA", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("partyB", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(ccy)));
    event.parameters.push(new ethereum.EventParam("prevPV0", ethereum.Value.fromUnsignedBigInt(prevPV0)));
    event.parameters.push(new ethereum.EventParam("prevPV1", ethereum.Value.fromUnsignedBigInt(prevPV1)));
    event.parameters.push(new ethereum.EventParam("currentPV0", ethereum.Value.fromUnsignedBigInt(currentPV0)));
    event.parameters.push(new ethereum.EventParam("currentPV1", ethereum.Value.fromUnsignedBigInt(currentPV1)));

    return event
}

export function createCollateralVaultLinkedEvent(
    vault: Address,
    ccy: Bytes,
    tokenAddress: Address
): CollateralVaultLinked {
    let mockEvent = newMockEvent();
    let event = new CollateralVaultLinked(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(ccy)));
    event.parameters.push(new ethereum.EventParam("tokenAddress", ethereum.Value.fromAddress(tokenAddress)));

    return event
}

export function createCollateralVaultRemovedEvent(
    vault: Address,
    ccy: Bytes,
    tokenAddress: Address
): CollateralVaultRemoved {
    let mockEvent = newMockEvent();
    let event = new CollateralVaultRemoved(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault)));
    event.parameters.push(new ethereum.EventParam("ccy", ethereum.Value.fromBytes(ccy)));
    event.parameters.push(new ethereum.EventParam("tokenAddress", ethereum.Value.fromAddress(tokenAddress)));

    return event
}

export function createCollateralUserAddedEvent(user: Address): CollateralUserAdded {
    let mockEvent = newMockEvent();
    let event = new CollateralUserAdded(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("user", ethereum.Value.fromAddress(user)));

    return event
}

export function createCollateralUserRemovedEvent(user: Address): CollateralUserRemoved {
    let mockEvent = newMockEvent();
    let event = new CollateralUserRemoved(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("user", ethereum.Value.fromAddress(user)));

    return event
}
