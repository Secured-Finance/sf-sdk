import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as/assembly/index"
import { Deposit, PositionDeposit, Withdraw, PositionWithdraw, Liquidate, LiquidateIndependent, RebalanceBetween, RebalanceFrom, RebalanceTo } from "../../generated/templates/CollateralVault/CollateralVault";

export function createDepositEvent(
    user: Address,
    amount: BigInt
): Deposit {
    let mockEvent = newMockEvent();
    let event = new Deposit(
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
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}

export function createPositionDepositEvent(
    user: Address,
    counterparty: Address,
    amount: BigInt
): PositionDeposit {
    let mockEvent = newMockEvent();
    let event = new PositionDeposit(
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
    event.parameters.push(new ethereum.EventParam("counterparty", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}

export function createWithdrawEvent(
    user: Address,
    amount: BigInt
): Withdraw {
    let mockEvent = newMockEvent();
    let event = new Withdraw(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("from", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}

export function createPositionWithdrawEvent(
    user: Address,
    counterparty: Address,
    amount: BigInt
): PositionWithdraw {
    let mockEvent = newMockEvent();
    let event = new PositionWithdraw(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("from", ethereum.Value.fromAddress(user)));
    event.parameters.push(new ethereum.EventParam("counterparty", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}

export function createLiquidateEvent(
    from: Address,
    to: Address,
    amount: BigInt
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

    event.parameters.push(new ethereum.EventParam("from", ethereum.Value.fromAddress(from)));
    event.parameters.push(new ethereum.EventParam("to", ethereum.Value.fromAddress(to)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}


export function createLiquidateIndependentEvent(
    from: Address,
    to: Address,
    amount: BigInt
): LiquidateIndependent {
    let mockEvent = newMockEvent();
    let event = new LiquidateIndependent(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
    );
    event.parameters = new Array();

    event.parameters.push(new ethereum.EventParam("from", ethereum.Value.fromAddress(from)));
    event.parameters.push(new ethereum.EventParam("to", ethereum.Value.fromAddress(to)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}

export function createRebalanceToEvent(
    user: Address,
    counterparty: Address,
    amount: BigInt
): RebalanceTo {
    let mockEvent = newMockEvent();
    let event = new RebalanceTo(
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
    event.parameters.push(new ethereum.EventParam("counterparty", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}

export function createRebalanceFromEvent(
    user: Address,
    counterparty: Address,
    amount: BigInt
): RebalanceFrom {
    let mockEvent = newMockEvent();
    let event = new RebalanceFrom(
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
    event.parameters.push(new ethereum.EventParam("counterparty", ethereum.Value.fromAddress(counterparty)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}

export function createRebalanceBetweenEvent(
    user: Address,
    fromCounterparty: Address,
    toCounterparty: Address,
    amount: BigInt
): RebalanceBetween {
    let mockEvent = newMockEvent();
    let event = new RebalanceBetween(
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
    event.parameters.push(new ethereum.EventParam("fromCounterparty", ethereum.Value.fromAddress(fromCounterparty)));
    event.parameters.push(new ethereum.EventParam("toCounterparty", ethereum.Value.fromAddress(toCounterparty)));
    event.parameters.push(new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount)));

    return event
}
