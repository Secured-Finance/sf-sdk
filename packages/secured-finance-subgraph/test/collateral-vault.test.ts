import { assert, logStore, test } from "matchstick-as/assembly/index"
import { Address, BigInt, log } from "@graphprotocol/graph-ts"
import { toBytes32 } from "./utils/string"
import { ADDRESS_ZERO, BIG_INT_ZERO } from "../src/constants"

import {
    createDepositEvent,
    createLiquidateEvent,
    createLiquidateIndependentEvent,
    createPositionDepositEvent,
    createPositionWithdrawEvent,
    createRebalanceBetweenEvent,
    createRebalanceFromEvent,
    createRebalanceToEvent,
    createWithdrawEvent
} from "./mocks/collateral-vault"

import {
    handleCollateralVaultDeposit,
    handleCollateralVaultWithdraw,
    handleCollateralVaultRebalanceTo,
    handleCollateralVaultRebalanceBetween,
    handleCollateralVaultRebalanceFrom,
    handleCollateralVaultLiquidation,
    handleCollateralVaultLiquidationIndependent,
    handleCollateralVaultDepositInPosition,
    handleCollateralVaultWithdrawFromPosition
} from "../src/collateral-vault"

import { createCollateralVaultLinkedEvent, createCollateralVaultRemovedEvent } from "./mocks/collateral-aggregator"
import { handleCollateralVaultLinked, handleCollateralVaultRemoved } from "../src/collateral-aggregator"
import { createCurrencyEntity } from "./utils/entities"
import { isFlippedAddresses, packAddresses } from "../src/helpers"

export { 
    handleCollateralVaultDeposit,
    handleCollateralVaultWithdraw,
    handleCollateralVaultRebalanceTo,
    handleCollateralVaultRebalanceBetween,
    handleCollateralVaultRebalanceFrom,
    handleCollateralVaultLiquidation,
    handleCollateralVaultLiquidationIndependent,
    handleCollateralVaultDepositInPosition,
    handleCollateralVaultWithdrawFromPosition,
    handleCollateralVaultLinked,
    handleCollateralVaultRemoved
}

const user = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');
const counterparty = Address.fromString('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
const currencyShortName = 'ETH';
const currencyIdentifier = toBytes32(currencyShortName);
const vault = Address.fromString('0x8Bb31f9dBC5A3e7dc3387221225cae25853ff22d');
const tokenAddress = Address.fromString('0x7FFe52F0a8BA50Ef54049Fc9548C8cdf13D29962');
const bookId = user.toHex() + '-' + vault.toHex() + '-' + currencyIdentifier.toHex()
const flippedAddr = isFlippedAddresses(user, counterparty);
const packedAddr = packAddresses(user, counterparty);
const positionId = packedAddr.toHex() + '-' + vault.toHex() + '-' + currencyIdentifier.toHex()

var independentCollateral0 = BIG_INT_ZERO;
var lockedCollateral0 = BIG_INT_ZERO;
var positionLocked0 = BIG_INT_ZERO;
var secondPositionLocked0 = BIG_INT_ZERO;
var independentCollateral1 = BIG_INT_ZERO;
var lockedCollateral1 = BIG_INT_ZERO;
var positionLocked1 = BIG_INT_ZERO;
var secondPositionLocked1 = BIG_INT_ZERO;

test("Should create a new collateral vault and validate the state", () => {
    const currencyFullName = 'Ethereum';
    const chainId = 60;

    createCurrencyEntity(
        currencyIdentifier,
        currencyFullName,
        currencyShortName,
        chainId
    );

    let event = createCollateralVaultLinkedEvent(
        vault,
        currencyIdentifier,
        tokenAddress
    );
    handleCollateralVaultLinked(event)

    assert.fieldEquals(
        'CollateralVault',
        vault.toHexString(),
        'isSupported',
        'true'
    )

    assert.fieldEquals(
        'CollateralVault',
        vault.toHexString(),
        'tokenAddress',
        tokenAddress.toHex()
    )

    assert.fieldEquals(
        'CollateralVault',
        vault.toHexString(),
        'address',
        vault.toHex()
    )
});

test("Should deposit ETH collateral into the vault and validate the state", () => {
    const amount = BigInt.fromI32(10000);
    independentCollateral0 = independentCollateral0.plus(amount);

    let event = createDepositEvent(user, amount);
    event.address = vault
    handleCollateralVaultDeposit(event)

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'independentCollateral',
        independentCollateral0.toString()
    )

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'lockedCollateral',
        '0'
    )

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'isDefaulted',
        'false'
    )
});

test("Should withdraw more ETH collateral from the vault and throw an error", () => {
    const amount = BigInt.fromI32(15000);

    let event = createWithdrawEvent(user, amount);
    event.address = vault
    handleCollateralVaultWithdraw(event)
    throw new Error();
}, true);

test("Should withdraw some ETH collateral from the vault and validate the state", () => {
    const amount = BigInt.fromI32(3000);
    independentCollateral0 = independentCollateral0.minus(amount);

    let event = createWithdrawEvent(user, amount);
    event.address = vault
    handleCollateralVaultWithdraw(event)

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'independentCollateral',
        independentCollateral0.toString()
    )
});

test("Should deposit some ETH collateral into the position with counterparty and validate the state", () => {
    const amount = BigInt.fromI32(7000);
    lockedCollateral0 = lockedCollateral0.plus(amount);

    if (flippedAddr) {
        positionLocked0 = positionLocked0.plus(amount)
    } else {
        positionLocked1 = positionLocked1.plus(amount)
    }

    let event = createPositionDepositEvent(user, counterparty, amount);
    event.address = vault
    handleCollateralVaultDepositInPosition(event)

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'independentCollateral',
        independentCollateral0.toString()
    )

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId,
        'lockedCollateral0',
        flippedAddr ? positionLocked1.toString() : positionLocked0.toString()
    )
});

test("Should try to withdraw ETH collateral from the position and throw an error on lockedCollateral underflow", () => {
    const amount = BigInt.fromI32(1000);
    let event = createPositionWithdrawEvent(counterparty, user, amount);
    event.address = vault
    handleCollateralVaultWithdrawFromPosition(event)
    throw new Error();
}, true);

test("Should withdraw previously locked ETH collateral from the position with counterparty and validate the state", () => {
    const amount = BigInt.fromI32(7000);
    lockedCollateral0 = lockedCollateral0.minus(amount);

    if (flippedAddr) {
        positionLocked0 = positionLocked0.minus(amount)
    } else {
        positionLocked1 = positionLocked1.minus(amount)
    }

    let event = createPositionWithdrawEvent(user, counterparty, amount);
    event.address = vault
    handleCollateralVaultWithdrawFromPosition(event)

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'independentCollateral',
        independentCollateral0.toString()
    )

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId,
        'lockedCollateral0',
        flippedAddr ? positionLocked1.toString() : positionLocked0.toString()
    )
});

test("Should try to rebalance collateral into position with counterparty and throw an error on independentCollateral underflow", () => {
    const amount = BigInt.fromI32(9000);
    let event = createRebalanceToEvent(counterparty, user, amount);
    event.address = vault
    handleCollateralVaultRebalanceTo(event)
    throw new Error();
}, true);

test("Should successfully rebalance collateral into position with counterparty and validate the state", () => {
    const amount = BigInt.fromI32(7000);
    let event = createRebalanceToEvent(user, counterparty, amount);
    event.address = vault
    handleCollateralVaultRebalanceTo(event)

    independentCollateral0 = independentCollateral0.minus(amount);
    lockedCollateral0 = lockedCollateral0.plus(amount);

    if (flippedAddr) {
        positionLocked0 = positionLocked0.plus(amount)
    } else {
        positionLocked1 = positionLocked1.plus(amount)
    }

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'independentCollateral',
        independentCollateral0.toString()
    )

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId,
        'lockedCollateral0',
        flippedAddr ? positionLocked1.toString() : positionLocked0.toString()
    )
});

test("Should successfully rebalance collateral from the position with counterparty and validate the state", () => {
    const amount = BigInt.fromI32(5000);
    let event = createRebalanceFromEvent(user, counterparty, amount);
    event.address = vault
    handleCollateralVaultRebalanceFrom(event)

    independentCollateral0 = independentCollateral0.plus(amount);
    lockedCollateral0 = lockedCollateral0.minus(amount);

    if (flippedAddr) {
        positionLocked0 = positionLocked0.minus(amount)
    } else {
        positionLocked1 = positionLocked1.minus(amount)
    }

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'independentCollateral',
        independentCollateral0.toString()
    )

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId,
        'lockedCollateral0',
        flippedAddr ? positionLocked1.toString() : positionLocked0.toString()
    )
});

test("Should try to rebalance collateral from the position and throw an error on lockedCollateral underflow", () => {
    const amount = BigInt.fromI32(1000);
    let event = createRebalanceFromEvent(counterparty, user, amount);
    event.address = vault
    handleCollateralVaultRebalanceFrom(event)
    throw new Error();
}, true);

test("Should try to rebalance collateral between 2 positions and throw an error on lockedCollateral underflow", () => {
    const amount = BigInt.fromI32(1000);
    let event = createRebalanceBetweenEvent(counterparty, user, vault, amount);
    event.address = vault
    handleCollateralVaultRebalanceBetween(event)
    throw new Error();
}, true);

test("Should successfully rebalance collateral between 2 positions and validate the state", () => {
    const amount = BigInt.fromI32(2000);

    let event = createRebalanceBetweenEvent(user, counterparty, vault, amount);
    event.address = vault
    handleCollateralVaultRebalanceBetween(event)

    if (flippedAddr) {
        positionLocked0 = positionLocked0.minus(amount)
    } else {
        positionLocked1 = positionLocked1.minus(amount)
    }

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId,
        'lockedCollateral0',
        flippedAddr ? positionLocked1.toString() : positionLocked0.toString()
    )

    const flippedAddr2 = isFlippedAddresses(user, vault);
    const packedAddr2 = packAddresses(user, vault);
    const positionId2 = packedAddr2.toHex() + '-' + vault.toHex() + '-' + currencyIdentifier.toHex()

    if (flippedAddr2) {
        secondPositionLocked1 = secondPositionLocked1.plus(amount)
    } else {
        secondPositionLocked0 = secondPositionLocked0.plus(amount)
    }

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId2,
        'lockedCollateral0',
        secondPositionLocked0.toString()
    )

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId2,
        'lockedCollateral1',
        secondPositionLocked1.toString()
    )
});

test("Should try to liquidate collateral between in a position and throw an error on lockedCollateral underflow", () => {
    const amount = BigInt.fromI32(2500);
    let event = createLiquidateEvent(counterparty, user, amount);
    event.address = vault
    handleCollateralVaultLiquidation(event)
    throw new Error();
}, true);

test("Should successfully liquidate collateral in a position and validate the state", () => {
    const secondBookId = vault.toHex() + '-' + vault.toHex() + '-' + currencyIdentifier.toHex()
    const amount = BigInt.fromI32(1500);
    lockedCollateral0 = lockedCollateral0.minus(amount);
    lockedCollateral1 = lockedCollateral1.plus(amount);

    let event = createLiquidateEvent(user, vault, amount);
    event.address = vault
    handleCollateralVaultLiquidation(event);

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'lockedCollateral',
        lockedCollateral0.toString()
    )

    assert.fieldEquals(
        'CollateralBook',
        secondBookId,
        'lockedCollateral',
        lockedCollateral1.toString()
    )

    const flippedAddr = isFlippedAddresses(user, vault);
    const packedAddr = packAddresses(user, vault);
    const positionId = packedAddr.toHex() + '-' + vault.toHex() + '-' + currencyIdentifier.toHex()

    if (flippedAddr) {
        secondPositionLocked0 = secondPositionLocked0.plus(amount)
        secondPositionLocked1 = secondPositionLocked1.minus(amount)
    } else {
        secondPositionLocked1 = secondPositionLocked1.plus(amount)
        secondPositionLocked0 = secondPositionLocked0.minus(amount)
    }

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId,
        'lockedCollateral0',
        secondPositionLocked0.toString()
    )

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId,
        'lockedCollateral1',
        secondPositionLocked1.toString()
    )
});

test("Should try to liquidate independent collateral, and throw an error on independentCollateral underflow", () => {
    const amount = BigInt.fromI32(2500);
    let event = createLiquidateIndependentEvent(counterparty, user, amount);
    event.address = vault
    handleCollateralVaultLiquidationIndependent(event)
    throw new Error();
}, true);

test("Should successfully liquidate independent collateral between 2 parties and validate the state", () => {
    const amount = BigInt.fromI32(3500);
    const secondBookId = vault.toHex() + '-' + vault.toHex() + '-' + currencyIdentifier.toHex()
    independentCollateral0 = independentCollateral0.minus(amount);
    lockedCollateral1 = lockedCollateral1.plus(amount);

    let event = createLiquidateIndependentEvent(user, vault, amount);
    event.address = vault
    handleCollateralVaultLiquidationIndependent(event);

    assert.fieldEquals(
        'CollateralBook',
        bookId,
        'independentCollateral',
        independentCollateral0.toString()
    )

    assert.fieldEquals(
        'CollateralBook',
        secondBookId,
        'lockedCollateral',
        lockedCollateral1.toString()
    )

    const flippedAddr = isFlippedAddresses(user, vault);
    const packedAddr = packAddresses(user, vault);
    const positionId = packedAddr.toHex() + '-' + vault.toHex() + '-' + currencyIdentifier.toHex()

    if (flippedAddr) {
        secondPositionLocked1 = secondPositionLocked1.plus(amount)
    } else {
        secondPositionLocked0 = secondPositionLocked0.plus(amount)
    }

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId,
        'lockedCollateral0',
        secondPositionLocked0.toString()
    )

    assert.fieldEquals(
        'CollateralVaultPosition',
        positionId,
        'lockedCollateral1',
        secondPositionLocked1.toString()
    )
});

test("Should create a remove collateral vault event and validate the state", () => {
    let event = createCollateralVaultRemovedEvent(
        vault,
        currencyIdentifier,
        tokenAddress
    );
    handleCollateralVaultRemoved(event)

    assert.fieldEquals(
        'CollateralVault',
        vault.toHexString(),
        'isSupported',
        'false'
    )

    assert.fieldEquals(
        'CollateralVault',
        vault.toHexString(),
        'aggregator',
        ADDRESS_ZERO.toHex()
    )
});
