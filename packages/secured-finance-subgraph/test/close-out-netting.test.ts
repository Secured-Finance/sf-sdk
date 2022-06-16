import { assert, logStore, test } from "matchstick-as/assembly/index"
import { Address, BigInt, log } from "@graphprotocol/graph-ts"

import { createAddCloseOutPaymentsEvent, createRemoveCloseOutPaymentsEvent } from "./mocks/close-out-netting"
import { handleCloseOutPaymentDecrease, handleCloseOutPaymentIncrease } from "../src/close-out-netting"
import { toBytes32 } from "./utils/string"
import { BIG_INT_ZERO } from "../src/constants"
import { isFlippedAddresses, packAddresses } from "../src/helpers"
export { handleCloseOutPaymentDecrease, handleCloseOutPaymentIncrease }

const user = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');
const counterparty = Address.fromString('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
const flippedAddr = isFlippedAddresses(user, counterparty);
const currencyIdentifier = toBytes32('ETH');
const packedAddr = packAddresses(user, counterparty);
const closeOutId = packedAddr.toHex() + '-' + currencyIdentifier.toHex();
var aggregatedPayment0 = BIG_INT_ZERO;
var aggregatedPayment1 = BIG_INT_ZERO;
var netPayment = BIG_INT_ZERO;

test("Should register new close out payment and validate net payment", () => {
    const payment0 = BigInt.fromI32(10000);
    const payment1 = BigInt.fromI32(5000);
    const paymentFlip = payment0.lt(payment1);

    aggregatedPayment0 = aggregatedPayment0.plus(payment0);
    aggregatedPayment1 = aggregatedPayment1.plus(payment1);

    netPayment = netPayment.plus(payment0).minus(payment1);

    let event = createAddCloseOutPaymentsEvent(
        user,
        counterparty,
        currencyIdentifier,
        payment0,
        payment1
    );
    handleCloseOutPaymentIncrease(event);

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'aggregatedPayment0',
        flippedAddr ? aggregatedPayment1.toString() : aggregatedPayment0.toString()
    )

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'aggregatedPayment1',
        flippedAddr ? aggregatedPayment0.toString() : aggregatedPayment1.toString()
    )

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'netPayment',
        netPayment.toString()
    )

    const isFlipped: string = flippedAddr ? (!paymentFlip).toString() : paymentFlip.toString()

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'flipped',
        isFlipped
    )
})

test("Should add more payments and validated flipped close out netting", () => {
    const payment0 = BigInt.fromI32(5000);
    const payment1 = BigInt.fromI32(25000);
    const paymentFlip = payment0.lt(payment1);

    aggregatedPayment0 = aggregatedPayment0.plus(payment0);
    aggregatedPayment1 = aggregatedPayment1.plus(payment1);

    netPayment = payment1.minus(netPayment).minus(payment0);

    let event = createAddCloseOutPaymentsEvent(
        user,
        counterparty,
        currencyIdentifier,
        payment0,
        payment1
    );
    handleCloseOutPaymentIncrease(event);

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'aggregatedPayment0',
        flippedAddr ? aggregatedPayment1.toString() : aggregatedPayment0.toString()
    )

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'aggregatedPayment1',
        flippedAddr ? aggregatedPayment0.toString() : aggregatedPayment1.toString()
    )

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'netPayment',
        netPayment.toString()
    )

    const isFlipped: string = flippedAddr ? (!paymentFlip).toString() : paymentFlip.toString()
    
    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'flipped',
        isFlipped
    )
})

test("Should remove payments more that aggregated amounts and throw an error", () => {
    const payment0 = BigInt.fromI32(15000);
    const payment1 = BigInt.fromI32(35000);

    let event = createRemoveCloseOutPaymentsEvent(
        user,
        counterparty,
        currencyIdentifier,
        payment0,
        payment1
    );
    
    handleCloseOutPaymentDecrease(event);
    throw new Error();
}, true)

test("Should successfully remove payments and validate amounts", () => {
    const payment0 = BigInt.fromI32(10000);
    const payment1 = BigInt.fromI32(20000);
    const paymentFlip = payment0.lt(payment1);

    aggregatedPayment0 = aggregatedPayment0.minus(payment0);
    aggregatedPayment1 = aggregatedPayment1.minus(payment1);

    netPayment = netPayment.plus(payment0).minus(payment1);

    let event = createRemoveCloseOutPaymentsEvent(
        user,
        counterparty,
        currencyIdentifier,
        payment0,
        payment1
    );
    handleCloseOutPaymentDecrease(event);

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'aggregatedPayment0',
        flippedAddr ? aggregatedPayment1.toString() : aggregatedPayment0.toString()
    )

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'aggregatedPayment1',
        flippedAddr ? aggregatedPayment0.toString() : aggregatedPayment1.toString()
    )

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'netPayment',
        netPayment.toString()
    )

    const isFlipped: string = flippedAddr ? (!paymentFlip).toString() : paymentFlip.toString()

    assert.fieldEquals(
        'CloseOutNetting',
        closeOutId,
        'flipped',
        isFlipped
    )
})
