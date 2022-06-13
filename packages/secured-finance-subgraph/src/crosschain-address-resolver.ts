import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CrosschainAddress } from "../generated/schema"
import { UpdateAddress } from '../generated/CrosschainAddressResolver/CrosschainAddressResolver'
import { ZERO_BYTES } from "./constants"

function createCrosschainAddress(ethAddress: Address, chainId: BigInt): CrosschainAddress {
    const id = ethAddress.toHexString() + '-' + chainId.toString()
    const crosschainAddress = new CrosschainAddress(id)

    if (crosschainAddress) {
        crosschainAddress.ethAddress = ethAddress
        crosschainAddress.user = ethAddress.toHex()
        crosschainAddress.chainId = chainId
        crosschainAddress.address = ''
        crosschainAddress.save()
    }
  
    return crosschainAddress as CrosschainAddress
}

export function getCrosschainAddress(ethAddress: Address, chainId: BigInt): CrosschainAddress | null {
    const id = ethAddress.toHexString() + '-' + chainId.toString()
    let crosschainAddress = CrosschainAddress.load(id)

    if (!crosschainAddress) {
        crosschainAddress = createCrosschainAddress(ethAddress, chainId)
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
