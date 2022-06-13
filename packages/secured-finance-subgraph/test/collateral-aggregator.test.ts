import { assert, logStore, test } from "matchstick-as/assembly/index"
import { Address, BigInt, log } from "@graphprotocol/graph-ts"
import { toBytes32 } from "./utils/string"
import { ADDRESS_ZERO, BIG_INT_ONE, BIG_INT_ZERO } from "../src/constants"

import { 
    createAutoLiquidationUpdateEvent,
    createLiquidationPriceUpdateEvent,
    createMarginCallThresholdUpdateEvent,
    createMinCollateralRatioUpdateEvent,
    createCollateralUserAddedEvent,
    createCollateralUserRemovedEvent,
    createRegisterEvent,
    createUseUnsettledCollateralEvent,
    createReleaseUnsettledEvent,
    createUseCollateralEvent,
    createReleaseCollateralEvent,
    createSettleCollateralEvent,
    createUpdatePVEvent
} from "./mocks/collateral-aggregator"

import { 
    handleCollateralAutoLiquidationRatioUpdate,
    handleCollateralLiquidationPriceUpdate,
    handleCollateralMarginCallUpdate,
    handleCollateralMinCollateralRatioUpdate,
    handleCollateralUserAdded,
    handleCollateralUserRemoved,
    handleCollateralAggregatorRegistration,
    handleCollateralUnsettledUse,
    handleCollateralUnsettledRelease,
    handleCollateralPositionUse,
    handleCollateralPositionRelease,
    handleCollateralPositionSettle,
    handleCollateralPositionUpdatePV
} from "../src/collateral-aggregator"

import { isFlippedAddresses, packAddresses } from "../src/helpers"

export {
    handleCollateralAutoLiquidationRatioUpdate,
    handleCollateralMarginCallUpdate,
    handleCollateralLiquidationPriceUpdate,
    handleCollateralMinCollateralRatioUpdate,
    handleCollateralUserAdded,
    handleCollateralUserRemoved,
    handleCollateralAggregatorRegistration,
    handleCollateralUnsettledUse,
    handleCollateralUnsettledRelease,
    handleCollateralPositionUse,
    handleCollateralPositionRelease,
    handleCollateralPositionSettle,
    handleCollateralPositionUpdatePV
}

const user = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');
const counterparty = Address.fromString('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
const currencyShortName = 'ETH';
const currencyIdentifier = toBytes32(currencyShortName);
const aggregator = Address.fromString('0x8Bb31f9dBC5A3e7dc3387221225cae25853ff22d');
const loanImplementation = Address.fromString('0x352F2D898c42561f5c46CedD5453799709e03fc7');
const flippedAddr = isFlippedAddresses(user, counterparty);
const packedAddr = packAddresses(user, counterparty);
const nettingId = packedAddr.toHex() + '-' + currencyIdentifier.toHex()

var positionUnsettled0PV = BIG_INT_ZERO;
var positionUnsettled1PV = BIG_INT_ZERO;

var unsettled0PV = BIG_INT_ZERO;
var unsettled1PV = BIG_INT_ZERO;
var party0PV = BIG_INT_ZERO;
var party1PV = BIG_INT_ZERO;


test("Should update auto liquidation level and validate the state", () => {
    const prevRatio = BigInt.fromI32(12500);
    const ratio = BigInt.fromI32(12000);

    let event = createAutoLiquidationUpdateEvent(
        prevRatio,
        ratio,
    );
    event.address = aggregator
    handleCollateralAutoLiquidationRatioUpdate(event)

    assert.fieldEquals(
        'CollateralAggregator',
        aggregator.toHex(),
        'autoLiquidation',
        ratio.toString()
    )
});

test("Should update liquidation price and validate the state", () => {
    const prevPrice = BigInt.fromI32(12000);
    const price = BigInt.fromI32(11500);

    let event = createLiquidationPriceUpdateEvent(prevPrice, price);
    event.address = aggregator
    handleCollateralLiquidationPriceUpdate(event)

    assert.fieldEquals(
        'CollateralAggregator',
        aggregator.toHex(),
        'liquidationPrice',
        price.toString()
    )
});

test("Should update margin call level and validate the state", () => {
    const prevRatio = BigInt.fromI32(15000);
    const ratio = BigInt.fromI32(14000);

    let event = createMarginCallThresholdUpdateEvent(prevRatio, ratio);
    event.address = aggregator
    handleCollateralMarginCallUpdate(event)

    assert.fieldEquals(
        'CollateralAggregator',
        aggregator.toHex(),
        'marginCall',
        ratio.toString()
    )
});

test("Should update minimal collateral level and validate the state", () => {
    const prevRatio = BigInt.fromI32(2500);
    const ratio = BigInt.fromI32(2000);

    let event = createMinCollateralRatioUpdateEvent(prevRatio, ratio);
    event.address = aggregator
    handleCollateralMinCollateralRatioUpdate(event)

    assert.fieldEquals(
        'CollateralAggregator',
        aggregator.toHex(),
        'minCollateralRequirements',
        ratio.toString()
    )
});

test("Should update minimal collateral level and validate the state", () => {
    const prevRatio = BigInt.fromI32(2500);
    const ratio = BigInt.fromI32(2000);

    let event = createMinCollateralRatioUpdateEvent(prevRatio, ratio);
    event.address = aggregator
    handleCollateralMinCollateralRatioUpdate(event)

    assert.fieldEquals(
        'CollateralAggregator',
        aggregator.toHex(),
        'minCollateralRequirements',
        ratio.toString()
    )
});

test("Should register new collateral user and validate the state", () => {
    let event = createCollateralUserAddedEvent(loanImplementation);
    event.address = aggregator
    handleCollateralUserAdded(event)

    assert.fieldEquals(
        'CollateralUserContract',
        loanImplementation.toHex(),
        'isSupported',
        'true'
    )

    assert.fieldEquals(
        'CollateralUserContract',
        loanImplementation.toHex(),
        'aggregator',
        aggregator.toHex()
    )

    assert.fieldEquals(
        'CollateralUserContract',
        loanImplementation.toHex(),
        'address',
        loanImplementation.toHex()
    )
});

test("Should remove existing collateral user and validate the state", () => {
    let event = createCollateralUserRemovedEvent(loanImplementation);
    event.address = aggregator
    handleCollateralUserRemoved(event)

    assert.fieldEquals(
        'CollateralUserContract',
        loanImplementation.toHex(),
        'isSupported',
        'false'
    )

    assert.fieldEquals(
        'CollateralUserContract',
        loanImplementation.toHex(),
        'aggregator',
        ADDRESS_ZERO.toHex()
    )

    assert.fieldEquals(
        'CollateralUserContract',
        loanImplementation.toHex(),
        'address',
        loanImplementation.toHex()
    )
});

test("Should register new user in the collateral aggregator and validate the state", () => {
    let event = createRegisterEvent(user);
    event.address = aggregator
    handleCollateralAggregatorRegistration(event)

    assert.fieldEquals(
        'CollateralPosition',
        user.toHex(),
        'isRegistered',
        'true'
    )
});

test("Should use user's unsettled collateral and validate the state", () => {
    const amount = BigInt.fromI32(5000);
    positionUnsettled0PV = positionUnsettled0PV.plus(amount);

    const positionId = user.toHex() + '-' + currencyIdentifier.toHex()

    let event = createUseUnsettledCollateralEvent(user, currencyIdentifier, amount);
    event.address = aggregator
    handleCollateralUnsettledUse(event)

    assert.fieldEquals(
        'CollateralPositionCurrencyState',
        positionId,
        'unsettledPV',
        positionUnsettled0PV.toString()
    )
});

test("Should try to release unsettled collateral and throw an error", () => {
    const amount = BigInt.fromI32(10000);

    let event = createReleaseUnsettledEvent(user, currencyIdentifier, amount);
    event.address = aggregator;
    handleCollateralUnsettledRelease(event);
    throw new Error();
}, true);

test("Should release unsettled collateral and validate the state", () => {
    const amount = BigInt.fromI32(2000);
    const positionId = user.toHex() + '-' + currencyIdentifier.toHex();
    positionUnsettled0PV = positionUnsettled0PV.minus(amount);

    let event = createReleaseUnsettledEvent(user, currencyIdentifier, amount);
    event.address = aggregator;
    handleCollateralUnsettledRelease(event);

    assert.fieldEquals(
        'CollateralPositionCurrencyState',
        positionId,
        'unsettledPV',
        positionUnsettled0PV.toString()
    )
});

test("Should use collateral in a netting with counterparty and validate the state", () => {
    const amount0 = BigInt.fromI32(25000);
    const amount1 = BigInt.fromI32(10000);
    
    unsettled0PV = unsettled0PV.plus(amount0);
    unsettled1PV = unsettled1PV.plus(amount1);

    let event = createUseCollateralEvent(
        user,
        counterparty,
        currencyIdentifier,
        amount0,
        amount1,
        false
    );
    event.address = aggregator;
    handleCollateralPositionUse(event);

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'unsettled0PV',
        flippedAddr ? unsettled1PV.toString() : unsettled0PV.toString()
    )

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'unsettled1PV',
        flippedAddr ? unsettled0PV.toString() : unsettled1PV.toString()
    )
});

test("Should settle collateral in a netting with counterparty and validate the state", () => {
    const amount0 = BigInt.fromI32(25000);
    const amount1 = BigInt.fromI32(10000);
    
    unsettled0PV = unsettled0PV.minus(amount0);
    unsettled1PV = unsettled1PV.minus(amount1);
    party0PV = party0PV.plus(amount0);
    party1PV = party1PV.plus(amount1);

    let event = createSettleCollateralEvent(
        user,
        counterparty,
        currencyIdentifier,
        amount0,
        amount1
    );
    event.address = aggregator;
    handleCollateralPositionSettle(event);

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'unsettled0PV',
        flippedAddr ? unsettled1PV.toString() : unsettled0PV.toString()
    )

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'unsettled1PV',
        flippedAddr ? unsettled0PV.toString() : unsettled1PV.toString()
    )

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'party0PV',
        flippedAddr ? party1PV.toString() : party0PV.toString()
    )

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'party1PV',
        flippedAddr ? party0PV.toString() : party1PV.toString()
    )
});

test("Should try to settle more collateral in a netting and throw an error", () => {
    const amount0 = BigInt.fromI32(1000);
    const amount1 = BigInt.fromI32(2000);

    let event = createSettleCollateralEvent(
        user,
        counterparty,
        currencyIdentifier,
        amount0,
        amount1
    );
    event.address = aggregator;
    handleCollateralPositionSettle(event);
    throw new Error();
}, true);

test("Should try to release some collateral from netting and throw an error", () => {
    const amount0 = BigInt.fromI32(5000);
    const amount1 = BigInt.fromI32(2500);

    let event = createReleaseCollateralEvent(
        user,
        counterparty,
        currencyIdentifier,
        amount0,
        amount1,
        false
    );
    event.address = aggregator;
    handleCollateralPositionRelease(event);
    throw new Error();
}, true);

test("Should release collateral from netting with counterparty and validate the state", () => {
    const amount0 = BigInt.fromI32(20000);
    const amount1 = BigInt.fromI32(10000);
    
    party0PV = party0PV.minus(amount0);
    party1PV = party1PV.minus(amount1);

    let event = createReleaseCollateralEvent(
        user,
        counterparty,
        currencyIdentifier,
        amount0,
        amount1,
        true
    );
    event.address = aggregator;
    handleCollateralPositionRelease(event);

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'party0PV',
        flippedAddr ? party1PV.toString() : party0PV.toString()
    )

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'party1PV',
        flippedAddr ? party0PV.toString() : party1PV.toString()
    )
});

test("Should try to release even more collateral from netting and throw an error", () => {
    const amount0 = BigInt.fromI32(6000);
    const amount1 = BigInt.fromI32(2500);

    let event = createReleaseCollateralEvent(
        user,
        counterparty,
        currencyIdentifier,
        amount0,
        amount1,
        true
    );
    event.address = aggregator;
    handleCollateralPositionRelease(event);
    throw new Error();
}, true);

test("Should try to update more PV than exist from netting and throw an error", () => {
    const prevPV = BigInt.fromI32(10000);
    const newPV = BigInt.fromI32(1000);

    // logStore()
    let event = createUpdatePVEvent(
        user,
        counterparty,
        currencyIdentifier,
        prevPV,
        BIG_INT_ZERO,
        newPV,
        BIG_INT_ZERO
    );
    event.address = aggregator;
    handleCollateralPositionUpdatePV(event);
    throw new Error();
}, true);

test("Should update PV in a netting with counterparty and validate the state", () => {
    const prevPV0 = BigInt.fromI32(5000);
    const newPV0 = BigInt.fromI32(4000);

    const prevPV1 = BigInt.fromI32(0);
    const newPV1 = BigInt.fromI32(2500);
    
    party0PV = party0PV.minus(prevPV0).plus(newPV0);
    party1PV = party1PV.minus(prevPV1).plus(newPV1);

    let event = createUpdatePVEvent(
        user,
        counterparty,
        currencyIdentifier,
        prevPV0,
        prevPV1,
        newPV0,
        newPV1
    );
    event.address = aggregator;
    handleCollateralPositionUpdatePV(event);

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'party0PV',
        flippedAddr ? party1PV.toString() : party0PV.toString()
    )

    assert.fieldEquals(
        'CollateralNetting',
        nettingId,
        'party1PV',
        flippedAddr ? party0PV.toString() : party1PV.toString()
    )
});
