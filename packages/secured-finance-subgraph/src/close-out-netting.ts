import { BigInt, ByteArray, Bytes, log } from "@graphprotocol/graph-ts"
import { CloseOutNetting } from "../generated/schema"
import { AddCloseOutPayments, RemoveCloseOutPayments } from '../generated/CloseOutNetting/CloseOutNetting'
import { isFlippedAddresses, packAddresses } from "./helpers"

function createCloseOutNetting(id: string): CloseOutNetting {
    const closeOut = new CloseOutNetting(id)

    if (closeOut) {
        closeOut.save()
    }
  
    return closeOut as CloseOutNetting
}

export function getCloseOutNetting(packedAddr: ByteArray): CloseOutNetting {
    const id = packedAddr.toHexString()
    let closeOut = CloseOutNetting.load(id)

    if (!closeOut) {
        closeOut = createCloseOutNetting(id)
    }

    return closeOut as CloseOutNetting
}

export function handleCloseOutPaymentIncrease(event: AddCloseOutPayments): void {
    let packedAddr = packAddresses(event.params.party0, event.params.party1)
    let flippedAddr = isFlippedAddresses(event.params.party0, event.params.party1)

    const closeOut = getCloseOutNetting(packedAddr)

    if (closeOut) {
        closeOut.save()
    }
}

export function handleCloseOutPaymentDecrease(event: RemoveCloseOutPayments): void {
    let packedAddr = packAddresses(event.params.party0, event.params.party1)
    let flippedAddr = isFlippedAddresses(event.params.party0, event.params.party1)

    // const closeOut = getCloseOutNetting(packedAddr)

    // if (closeOut) {
    //     closeOut.save()
    // }
}
