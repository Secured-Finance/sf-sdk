import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CrosschainAddress } from "../generated/schema"
import { UpdateAddress } from '../generated/CrosschainAddressResolver/CrosschainAddressResolver'

function createCrosschainAddress(ethAddress: Address, chainID: BigInt): CrosschainAddress {
    const id = ethAddress.toHexString() + '-' + chainID.toString()
    const crosschainAddress = new CrosschainAddress(id)

    if (crosschainAddress) {
        crosschainAddress.ethAddress = ethAddress
        crosschainAddress.user = ethAddress.toHex()
        crosschainAddress.chainID = chainID
        crosschainAddress.save()
    }

    return crosschainAddress as CrosschainAddress
}

export function getCrosschainAddress(ethAddress: Address, chainID: BigInt): CrosschainAddress | null {
    const id = ethAddress.toHexString() + '-' + chainID.toString()
    let crosschainAddress = CrosschainAddress.load(id)

    if (!crosschainAddress) {
        crosschainAddress = createCrosschainAddress(ethAddress, chainID)
    }

    return crosschainAddress as CrosschainAddress
}

export function handleCrosschainAddressUpdate(event: UpdateAddress): void {
    const crosschainAddress = getCrosschainAddress(event.params._user, event.params._chainId)

    if (crosschainAddress) {
        crosschainAddress.address = event.params._address
    
        crosschainAddress.save()
    }
}
