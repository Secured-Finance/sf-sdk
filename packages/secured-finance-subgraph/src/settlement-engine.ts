import { CrosschainSettlementRequest } from "../generated/schema"
import { CrosschainSettlementRequested, CrosschainSettlementRequestFulfilled } from '../generated/SettlementEngine/SettlementEngine'

function createSettlementRequest(txHash: string): CrosschainSettlementRequest {
    const settlementRequest = new CrosschainSettlementRequest(txHash)

    if (settlementRequest) {
        settlementRequest.txHash = txHash
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
        settlementRequest.payerUser = event.params.payer.toHex()
        settlementRequest.receiver = event.params.receiver
        settlementRequest.receiverUser = event.params.receiver.toHex()
        settlementRequest.chainId = event.params.chainId
        settlementRequest.createdAt = event.block.timestamp
        settlementRequest.timestamp = event.params.timestamp
        settlementRequest.txHash = event.params.txHash
        settlementRequest.requestId = event.params.requestId
    
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
