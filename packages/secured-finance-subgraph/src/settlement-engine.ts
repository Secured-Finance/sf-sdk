import { Bytes } from "@graphprotocol/graph-ts"
import { CrosschainSettlementRequest } from "../generated/schema"
import { CrosschainSettlementRequested, CrosschainSettlementRequestFulfilled } from '../generated/SettlementEngine/SettlementEngine'
import { BIG_INT_ZERO, ZERO_BYTES } from "./constants"

function createSettlementRequest(txHash: string): CrosschainSettlementRequest {
    const settlementRequest = new CrosschainSettlementRequest(txHash)

    if (settlementRequest) {
        settlementRequest.payer = Bytes.empty()
        settlementRequest.crosschainPayerAddress = ''
        settlementRequest.payerUser = ''
        settlementRequest.receiver = Bytes.empty()
        settlementRequest.receiverUser = ''
        settlementRequest.crosschainReceiverAddress = ''
        settlementRequest.chainId = 0
        settlementRequest.createdAt = BIG_INT_ZERO
        settlementRequest.settledAt = BIG_INT_ZERO
        settlementRequest.amount = BIG_INT_ZERO
        settlementRequest.timestamp = BIG_INT_ZERO
        settlementRequest.requestId = Bytes.empty()
        settlementRequest.settlementId = ZERO_BYTES
        settlementRequest.txHash = txHash
        settlementRequest.paymentConfirmation = ''
        settlementRequest.save()
    }

    return settlementRequest as CrosschainSettlementRequest
}

export function getSettlementRequest(txHash: string): CrosschainSettlementRequest | null {
    let settlementRequest = CrosschainSettlementRequest.load(txHash)

    if (!settlementRequest) {
        settlementRequest = createSettlementRequest(txHash)
    }

    return settlementRequest as CrosschainSettlementRequest
}

export function handleCrosschainSettlementRequest(event: CrosschainSettlementRequested): void {
    const settlementRequest = getSettlementRequest(event.params.txHash)

    if (settlementRequest) {
        settlementRequest.payer = event.params.payer
        settlementRequest.crosschainPayerAddress = ''
        settlementRequest.payerUser = event.params.payer.toHex()
        settlementRequest.receiver = event.params.receiver
        settlementRequest.receiverUser = event.params.receiver.toHex()
        settlementRequest.crosschainReceiverAddress = ''
        settlementRequest.chainId = event.params.chainId
        settlementRequest.createdAt = event.block.timestamp
        settlementRequest.settledAt = BIG_INT_ZERO
        settlementRequest.amount = BIG_INT_ZERO
        settlementRequest.timestamp = event.params.timestamp
        settlementRequest.txHash = event.params.txHash
        settlementRequest.requestId = event.params.requestId
        settlementRequest.settlementId = ZERO_BYTES

        settlementRequest.save()
    }
}

export function handleFulfillCrosschainSettlementRequest(event: CrosschainSettlementRequestFulfilled): void {
    const settlementRequest = getSettlementRequest(event.params.txHash)

    if (settlementRequest) {
        settlementRequest.crosschainPayerAddress = event.params.payer
        settlementRequest.crosschainReceiverAddress = event.params.receiver
        settlementRequest.timestamp = event.params.timestamp
        settlementRequest.amount = event.params.amount
        settlementRequest.settledAt = event.block.timestamp
        settlementRequest.settlementId = event.params.settlementId
        settlementRequest.paymentConfirmation = event.params.settlementId.toHex()

        settlementRequest.save()
    }
}
