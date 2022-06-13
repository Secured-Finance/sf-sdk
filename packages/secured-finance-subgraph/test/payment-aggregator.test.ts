import { assert, test } from "matchstick-as/assembly/index"
import { Address, BigInt, ByteArray, Bytes, crypto } from "@graphprotocol/graph-ts"

import { createRegisterPaymentEvent, createRemovePaymentEvent, createVerifyPaymentEvent } from "./mocks/payment-aggregator"
import { getTimeSlotID, handleTimeSlotPaymentDecrease, handleTimeSlotPaymentIncrease, handleTimeSlotPaymentVerification } from "../src/payment-aggregator"
import { toBytes32 } from "./utils/string"
import { BIG_INT_ZERO } from "../src/constants"
import { isFlippedAddresses, packAddresses, timeslotPosition } from "../src/helpers"
export { handleTimeSlotPaymentDecrease, handleTimeSlotPaymentIncrease, handleTimeSlotPaymentVerification }

const user = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');
const counterparty = Address.fromString('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
const flippedAddr = isFlippedAddresses(user, counterparty);
const currencyIdentifier = toBytes32('ETH');
const packedAddr = packAddresses(user, counterparty);

const year = BigInt.fromI32(2022);
const month = BigInt.fromI32(5);
const day = BigInt.fromI32(20);
const timeSlotIdentifier = getTimeSlotID(packedAddr, currencyIdentifier, year, month, day);
const timeSlotPosition = timeslotPosition(year, month, day);

var aggregatedPayment0 = BIG_INT_ZERO;
var aggregatedPayment1 = BIG_INT_ZERO;
var netPayment = BIG_INT_ZERO;

test("Should register new payments for a specified timeslot, and validate the state", () => {
    const payment0 = BigInt.fromI32(10000);
    const payment1 = BigInt.fromI32(5000);
    const paymentFlip = payment0.lt(payment1);

    aggregatedPayment0 = aggregatedPayment0.plus(payment0);
    aggregatedPayment1 = aggregatedPayment1.plus(payment1);

    netPayment = netPayment.plus(payment0).minus(payment1);

    let event = createRegisterPaymentEvent(
        user,
        counterparty,
        currencyIdentifier,
        timeSlotPosition,
        payment0,
        payment1,
        year,
        month,
        day
    );
    handleTimeSlotPaymentIncrease(event);

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'address0',
        flippedAddr ? counterparty.toHex() : user.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'address1',
        flippedAddr ? user.toHex() : counterparty.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'totalPayment0',
        flippedAddr ? aggregatedPayment1.toString() : aggregatedPayment0.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'totalPayment1',
        flippedAddr ? aggregatedPayment0.toString() : aggregatedPayment1.toString()
    )

    const isFlipped: string = flippedAddr ? (!paymentFlip).toString() : paymentFlip.toString()

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'netPayment',
        netPayment.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'flipped',
        isFlipped
    )
})

test("Should register more payments for timeslot, and validate the state", () => {
    const payment0 = BigInt.fromI32(0);
    const payment1 = BigInt.fromI32(30000);
    const paymentFlip = payment0.lt(payment1);

    aggregatedPayment0 = aggregatedPayment0.plus(payment0);
    aggregatedPayment1 = aggregatedPayment1.plus(payment1);

    netPayment = payment1.minus(netPayment).minus(payment0);

    let event = createRegisterPaymentEvent(
        user,
        counterparty,
        currencyIdentifier,
        timeSlotPosition,
        payment0,
        payment1,
        year,
        month,
        day
    );
    handleTimeSlotPaymentIncrease(event);

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'totalPayment0',
        flippedAddr ? aggregatedPayment1.toString() : aggregatedPayment0.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'totalPayment1',
        flippedAddr ? aggregatedPayment0.toString() : aggregatedPayment1.toString()
    )

    const isFlipped: string = flippedAddr ? (!paymentFlip).toString() : paymentFlip.toString()

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'netPayment',
        netPayment.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'flipped',
        isFlipped
    )

})

test("Should remove some payments from timeslot, and validate the state", () => {
    const payment0 = BigInt.fromI32(10000);
    const payment1 = BigInt.fromI32(20000);
    const paymentFlip = payment0.lt(payment1);

    aggregatedPayment0 = aggregatedPayment0.minus(payment0);
    aggregatedPayment1 = aggregatedPayment1.minus(payment1);

    netPayment = netPayment.minus(payment1).plus(payment0);

    let event = createRemovePaymentEvent(
        user,
        counterparty,
        currencyIdentifier,
        timeSlotPosition,
        payment0,
        payment1,
        year,
        month,
        day
    );
    handleTimeSlotPaymentDecrease(event);

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'totalPayment0',
        flippedAddr ? aggregatedPayment1.toString() : aggregatedPayment0.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'totalPayment1',
        flippedAddr ? aggregatedPayment0.toString() : aggregatedPayment1.toString()
    )

    const isFlipped: string = flippedAddr ? (!paymentFlip).toString() : paymentFlip.toString()

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'netPayment',
        netPayment.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'flipped',
        isFlipped
    )

})

test("Should remove payments more that aggregated amounts and throw an error", () => {
    const payment0 = BigInt.fromI32(0);
    const payment1 = BigInt.fromI32(25000);

    let event = createRemovePaymentEvent(
        user,
        counterparty,
        currencyIdentifier,
        timeSlotPosition,
        payment0,
        payment1,
        year,
        month,
        day
    );
    handleTimeSlotPaymentDecrease(event);
    throw new Error();
}, true)

test("Should validate timeslot payments and validate the state changes", () => {
    const payment = BigInt.fromI32(10000);
    const settlementIdentifier = Bytes.fromByteArray(
        crypto.keccak256(ByteArray.fromI32(60))
    );
    
    let event = createVerifyPaymentEvent(
        counterparty,
        user,
        currencyIdentifier,
        timeSlotPosition,
        payment,
        settlementIdentifier,
        year,
        month,
        day
    );
    handleTimeSlotPaymentVerification(event);

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'paidAmount',
        payment.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'isSettled',
        'false'
    )

    assert.fieldEquals(
        'TimeSlotPaymentConfirmation',
        settlementIdentifier.toHex(),
        'amount',
        payment.toString()
    )

    assert.fieldEquals(
        'TimeSlotPaymentConfirmation',
        settlementIdentifier.toHex(),
        'payer',
        counterparty.toHex()
    )

    assert.fieldEquals(
        'TimeSlotPaymentConfirmation',
        settlementIdentifier.toHex(),
        'receiver',
        user.toHex()
    )

    assert.fieldEquals(
        'TimeSlotPaymentConfirmation',
        settlementIdentifier.toHex(),
        'timeslot',
        timeSlotIdentifier
    )

})

test("Should validate the final settlement payment and validate that timeslot is settled", () => {
    const payment = BigInt.fromI32(5000);
    const settlementIdentifier = Bytes.fromByteArray(
        crypto.keccak256(ByteArray.fromI32(61))
    );
    
    let event = createVerifyPaymentEvent(
        counterparty,
        user,
        currencyIdentifier,
        timeSlotPosition,
        payment,
        settlementIdentifier,
        year,
        month,
        day
    );
    handleTimeSlotPaymentVerification(event);

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'paidAmount',
        netPayment.toString()
    )

    assert.fieldEquals(
        'TimeSlot',
        timeSlotIdentifier,
        'isSettled',
        'true'
    )
})