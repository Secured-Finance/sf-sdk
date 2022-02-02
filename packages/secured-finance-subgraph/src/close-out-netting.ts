import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CloseOutNetting } from "../generated/schema"
import { AddCloseOutPayments, RemoveCloseOutPayments } from '../generated/CloseOutNetting/CloseOutNetting'
import { isFlippedAddresses, packAddresses } from "./helpers"
import { ZERO_BYTES } from "./constants"

function createCloseOutNetting(id: string): CloseOutNetting {
    const closeOut = new CloseOutNetting(id)

    if (closeOut) {
        closeOut.save()
    }
  
    return closeOut as CloseOutNetting
}

function getCloseOutId(packedAddr: Bytes, ccyCode: Bytes): string {
    return packedAddr.toHexString() + '-' + ccyCode.toHex()
}

export function getCloseOutNetting(id: string): CloseOutNetting {
    let closeOut = CloseOutNetting.load(id)

    if (!closeOut) {
        closeOut = createCloseOutNetting(id)
    }

    return closeOut as CloseOutNetting
}

export function handleCloseOutPaymentIncrease(event: AddCloseOutPayments): void {
    let packedAddr = packAddresses(event.params.party0, event.params.party1)
    let flippedAddr = isFlippedAddresses(event.params.party0, event.params.party1)
    let closeOutID = getCloseOutId(packedAddr, event.params.ccy)

    let payment0: BigInt
    let payment1: BigInt
    let address0: Bytes
    let address1: Bytes

    const closeOut = getCloseOutNetting(closeOutID)

    if (closeOut) {
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

        if (closeOut.packedAddresses == ZERO_BYTES) {
            closeOut.address0 = address0
            closeOut.address1 = address1
            closeOut.packedAddresses = packedAddr
            closeOut.currency = event.params.ccy.toHexString()
        }

        closeOut.aggregatedPayment0 = closeOut.aggregatedPayment0.plus(payment0)
        closeOut.aggregatedPayment1 = closeOut.aggregatedPayment1.plus(payment1)

        if (closeOut.flipped) {
            if (payment0.gt(closeOut.netPayment) && payment1.lt(payment0)) {
                closeOut.netPayment = payment0.minus(closeOut.netPayment.plus(payment1))
                closeOut.flipped = false
            } else {
                closeOut.netPayment = closeOut.netPayment.plus(payment1).minus(payment0)
            }
        } else {
            if (payment1.gt(closeOut.netPayment) && payment0.lt(payment1)) {
                closeOut.netPayment = payment1.minus(closeOut.netPayment.plus(payment0))
                closeOut.flipped = true
            } else {
                closeOut.netPayment = closeOut.netPayment.plus(payment0).minus(payment1)
            }
        }

        closeOut.save()
    }
}

export function handleCloseOutPaymentDecrease(event: RemoveCloseOutPayments): void {
    let packedAddr = packAddresses(event.params.party0, event.params.party1)
    let flippedAddr = isFlippedAddresses(event.params.party0, event.params.party1)
    let closeOutID = getCloseOutId(packedAddr, event.params.ccy)

    let payment0: BigInt
    let payment1: BigInt

    const closeOut = getCloseOutNetting(closeOutID)

    if (closeOut) {
        if (flippedAddr) {
            payment0 = event.params.payment1
            payment1 = event.params.payment0
        } else {
            payment0 = event.params.payment0
            payment1 = event.params.payment1
        }

        closeOut.aggregatedPayment0 = closeOut.aggregatedPayment0.minus(payment0)
        closeOut.aggregatedPayment1 = closeOut.aggregatedPayment1.minus(payment1)

        let paymentDelta = payment0.gt(payment1)  ? payment0.minus(payment1) : payment1.minus(payment0)
        let substraction: boolean

        if (closeOut.flipped) {
            substraction = payment0.ge(payment1) ? false : true
        } else {
            substraction = payment0.ge(payment1) ? true : false
        }

        if (paymentDelta.ge(closeOut.netPayment) && substraction) {
            closeOut.netPayment = paymentDelta.minus(closeOut.netPayment)
            closeOut.flipped = !closeOut.flipped
        } else {
            closeOut.netPayment = substraction ? closeOut.netPayment.minus(paymentDelta) : closeOut.netPayment.plus(paymentDelta)
        }

        closeOut.save()
    }
}
