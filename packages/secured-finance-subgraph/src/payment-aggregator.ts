import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { TimeSlot } from "../generated/schema"
import { RegisterPayment, RemovePayment, VerifyPayment, SettlePayment } from '../generated/PaymentAggregator/PaymentAggregator'
import { isFlippedAddresses, packAddresses } from "./helpers"
import { ZERO_BYTES } from "./constants"

function createTimeSlot(id: string): TimeSlot {
    const timeSlot = new TimeSlot(id)

    if (timeSlot) {
        timeSlot.save()
    }
  
    return timeSlot as TimeSlot
}

function getTimeSlotID(
    packedAddr: Bytes, 
    ccyCode: Bytes,
    year: BigInt,
    month: BigInt,
    day: BigInt
): string {
    return packedAddr.toHexString() + '-' + ccyCode.toHex() + '-' + year.toString() + '-' + month.toString() + '-' + day.toString()
}

export function getTimeSlot(id: string): TimeSlot {
    let timeSlot = TimeSlot.load(id)

    if (!timeSlot) {
        timeSlot = createTimeSlot(id)
    }

    return timeSlot as TimeSlot
}

export function handleTimeSlotPaymentIncrease(event: RegisterPayment): void {
    let packedAddr = packAddresses(event.params.party0, event.params.party1)
    let flippedAddr = isFlippedAddresses(event.params.party0, event.params.party1)
    let id = getTimeSlotID(packedAddr, event.params.ccy, event.params.year, event.params.month, event.params.day)

    let payment0: BigInt
    let payment1: BigInt
    let address0: Bytes
    let address1: Bytes

    const timeSlot = getTimeSlot(id)

    if (timeSlot) {
        if (flippedAddr) {
            address0 = event.params.party1
            address1 = event.params.party0
            payment0 = event.params.payment1
            payment1 = event.params.payment0
        } else {
            address0 = event.params.party0
            address1 = event.params.party1
            payment0 = event.params.payment0
            payment1 = event.params.payment1
        }

        if (timeSlot.position == ZERO_BYTES) {
            timeSlot.address0 = address0
            timeSlot.address1 = address1
            timeSlot.position = event.params.timeSlot
            timeSlot.year = event.params.year
            timeSlot.month = event.params.month
            timeSlot.day = event.params.day
            timeSlot.currency = event.params.ccy.toHexString()
        }

        timeSlot.totalPayment0 = timeSlot.totalPayment0.plus(payment0)
        timeSlot.totalPayment1 = timeSlot.totalPayment1.plus(payment1)

        if (timeSlot.totalPayment1.gt(timeSlot.totalPayment0)) {
            timeSlot.netPayment = timeSlot.totalPayment1.minus(timeSlot.totalPayment0)
            timeSlot.flipped = true
        } else {
            timeSlot.netPayment = timeSlot.totalPayment0.minus(timeSlot.totalPayment1)
            timeSlot.flipped = false
        }

        timeSlot.save()
    }
}

export function handleTimeSlotPaymentDecrease(event: RemovePayment): void {
    let packedAddr = packAddresses(event.params.party0, event.params.party1)
    let flippedAddr = isFlippedAddresses(event.params.party0, event.params.party1)
    let id = getTimeSlotID(packedAddr, event.params.ccy, event.params.year, event.params.month, event.params.day)

    let payment0: BigInt
    let payment1: BigInt
    let address0: Bytes
    let address1: Bytes

    const timeSlot = getTimeSlot(id)

    if (timeSlot) {
        if (flippedAddr) {
            address0 = event.params.party1
            address1 = event.params.party0
            payment0 = event.params.payment1
            payment1 = event.params.payment0
        } else {
            address0 = event.params.party0
            address1 = event.params.party1
            payment0 = event.params.payment0
            payment1 = event.params.payment1
        }

        timeSlot.totalPayment0 = timeSlot.totalPayment0.minus(payment0)
        timeSlot.totalPayment1 = timeSlot.totalPayment1.minus(payment1)

        if (timeSlot.totalPayment1.gt(timeSlot.totalPayment0)) {
            timeSlot.netPayment = timeSlot.totalPayment1.minus(timeSlot.totalPayment0)
            timeSlot.flipped = true
        } else {
            timeSlot.netPayment = timeSlot.totalPayment0.minus(timeSlot.totalPayment1)
            timeSlot.flipped = false
        }

        timeSlot.save()
    }
}

export function handleTimeSlotPaymentVerification(event: VerifyPayment): void {
    let packedAddr = packAddresses(event.params.verifier, event.params.counterparty)
    let id = getTimeSlotID(packedAddr, event.params.ccy, event.params.year, event.params.month, event.params.day)

    const timeSlot = getTimeSlot(id)

    if (timeSlot) {
        timeSlot.paymentProof = event.params.txHash
        timeSlot.verificationParty = event.params.verifier
        timeSlot.verificationTimestamp = event.block.timestamp

        timeSlot.save()
    }
}

export function handleTimeSlotPaymentSettlement(event: SettlePayment): void {
    let packedAddr = packAddresses(event.params.verifier, event.params.counterparty)
    let id = getTimeSlotID(packedAddr, event.params.ccy, event.params.year, event.params.month, event.params.day)

    const timeSlot = getTimeSlot(id)

    if (timeSlot) {
        if (timeSlot.paymentProof == event.params.txHash) {
            timeSlot.settlementParty = event.params.verifier
            timeSlot.settlementTimestamp = event.block.timestamp
    
            timeSlot.save()    
        }
    }
}
