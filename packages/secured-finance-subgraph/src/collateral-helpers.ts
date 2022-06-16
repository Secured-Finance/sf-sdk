import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { BilateralPosition, CollateralAggregator, CollateralBook, CollateralNetting, CollateralPosition, CollateralPositionCurrencyState, CollateralVault, CollateralVaultPosition } from "../generated/schema"
import { BIG_INT_ZERO, COLLATERAL_AGGREGATOR_ADDR, ZERO_BYTES } from "./constants"
import { isFlippedAddresses, packAddresses } from "./helpers"

function createCollateralAggregator(address: Address): CollateralAggregator {
    const aggregator = new CollateralAggregator(address.toHexString())

    if (aggregator) {
        aggregator.address = address
        aggregator.liquidationPrice = BigInt.fromI32(12000)
        aggregator.marginCall = BigInt.fromI32(15000)
        aggregator.autoLiquidation = BigInt.fromI32(12500)
        aggregator.minCollateralRequirements = BigInt.fromI32(2500)
        aggregator.save()
    }
  
    return aggregator as CollateralAggregator
}

export function getCollateralAggregator(address: Address): CollateralAggregator {
    let aggregator = CollateralAggregator.load(address.toHexString())

    if (!aggregator) {
        aggregator = createCollateralAggregator(address)
    }

    return aggregator as CollateralAggregator
}

function createCollateralPosition(address: Address): CollateralPosition {
    const position = new CollateralPosition(address.toHexString())
  
    if (position) {
        position.address = address
        position.isRegistered = false
        position.user = address.toHex()
        position.aggregator = COLLATERAL_AGGREGATOR_ADDR.toHexString()
        position.save()
    }
  
    return position as CollateralPosition
}

export function getCollateralPosition(address: Address): CollateralPosition {
    let position = CollateralPosition.load(address.toHexString())

    if (!position) {
        position = createCollateralPosition(address)
    }

    return position as CollateralPosition
}

function createCollateralPositionCurrencyState(
    address: Address,
    ccy: Bytes
): CollateralPositionCurrencyState {
    let id = address.toHexString() + '-' + ccy.toHexString()
    const ccyPosition = new CollateralPositionCurrencyState(id)

    if (ccyPosition) {
        ccyPosition.address = address
        ccyPosition.currency = ccy.toHexString()
        ccyPosition.currencyIdentifier = ccy
        ccyPosition.user = address.toHexString()
        ccyPosition.position = address.toHexString()
        ccyPosition.unsettledPV = BIG_INT_ZERO
        ccyPosition.aggregator = COLLATERAL_AGGREGATOR_ADDR.toHexString()
        ccyPosition.save()
    }
  
    return ccyPosition as CollateralPositionCurrencyState
}

export function getCollateralPositionCurrencyState(
    address: Address,
    ccy: Bytes
): CollateralPositionCurrencyState {
    let id = address.toHexString() + '-' + ccy.toHexString()
    let ccyPosition = CollateralPositionCurrencyState.load(id)

    if (!ccyPosition) {
        ccyPosition = createCollateralPositionCurrencyState(address, ccy)
    }

    return ccyPosition as CollateralPositionCurrencyState
}

function createCollateralBilateralPosition(
    address0: Address,
    address1: Address
): BilateralPosition {
    const packedAddr = packAddresses(address0, address1)
    const flippedAddr = isFlippedAddresses(address0, address1)
    const bilateralPosition = new BilateralPosition(packedAddr.toHexString())

    if (bilateralPosition) {
        if (flippedAddr) {
            bilateralPosition.address0 = address1
            bilateralPosition.address1 = address0
            bilateralPosition.addresses = address1.toHex() + '-' + address0.toHex()
        } else {
            bilateralPosition.address0 = address0
            bilateralPosition.address1 = address1
            bilateralPosition.addresses = address0.toHex() + '-' + address1.toHex()
        }

        bilateralPosition.packedAddresses = packedAddr
        bilateralPosition.aggregator = COLLATERAL_AGGREGATOR_ADDR.toHexString()
        bilateralPosition.save()
    }
  
    return bilateralPosition as BilateralPosition
}

export function getCollateralBilateralPosition(
    address0: Address,
    address1: Address
): BilateralPosition {
    const packedAddr = packAddresses(address0, address1)
    let bilateralPosition = BilateralPosition.load(packedAddr.toHexString())

    if (!bilateralPosition) {
        bilateralPosition = createCollateralBilateralPosition(address0, address1)
    }

    return bilateralPosition as BilateralPosition
}

function createCollateralNetting(
    packedAddr: Bytes,
    ccy: Bytes
): CollateralNetting {
    const id = packedAddr.toHexString() + '-' + ccy.toHexString()
    const netting = new CollateralNetting(id)

    if (netting) {
        netting.address0 = ZERO_BYTES
        netting.address1 = ZERO_BYTES
        netting.addresses = ''
        netting.packedAddresses = packedAddr
        netting.aggregator = COLLATERAL_AGGREGATOR_ADDR.toHexString()
        netting.bilateralPosition = packedAddr.toHexString()
        netting.currencyIdentifier = ccy
        netting.currency = ccy.toHexString()
        netting.unsettled0PV = BIG_INT_ZERO
        netting.unsettled1PV = BIG_INT_ZERO
        netting.party0PV = BIG_INT_ZERO
        netting.party1PV = BIG_INT_ZERO
        netting.netPV = BIG_INT_ZERO
        netting.save()
    }

    return netting as CollateralNetting
}

export function getCollateralNetting(
    address0: Address,
    address1: Address,
    ccy: Bytes
): CollateralNetting {
    const packedAddr = packAddresses(address0, address1)
    const id = packedAddr.toHexString() + '-' + ccy.toHexString()
    let netting = CollateralNetting.load(id)

    if (!netting) {
        netting = createCollateralNetting(packedAddr, ccy)
    }

    return netting as CollateralNetting
}

function createCollateralBook(
    address: Address,
    vault: Bytes,
    ccy: Bytes
): CollateralBook {
    const id = address.toHexString() + '-' + vault.toHexString() + '-' + ccy.toHexString()
    const book = new CollateralBook(id)
  
    if (book) {
        book.address = address
        book.user = address.toHexString()
        book.vault = vault.toHexString()
        book.isDefaulted = false
        book.currency = ccy.toHexString()
        book.currencyIdentifier = ccy
        book.independentCollateral = BIG_INT_ZERO
        book.lockedCollateral = BIG_INT_ZERO
        book.save()
    }

    return book as CollateralBook
}

export function getCollateralBook(
    address: Address,
    vault: Bytes,
    ccy: Bytes
): CollateralBook {
    const id = address.toHexString() + '-' + vault.toHexString() + '-' + ccy.toHexString()
    let book = CollateralBook.load(id)

    if (!book) {
        book = createCollateralBook(address, vault, ccy)
    }

    return book as CollateralBook
}

function createCollateralVaultPosition(
    address0: Address,
    address1: Address,
    vault: Bytes,
    ccy: Bytes
): CollateralVaultPosition {
    const packedAddr = packAddresses(address0, address1)
    const flippedAddr = isFlippedAddresses(address0, address1)
    const id = packedAddr.toHexString() + '-' + vault.toHexString() + '-' + ccy.toHexString()
    const vaultPosition = new CollateralVaultPosition(id)

    if (vaultPosition) {
        if (flippedAddr) {
            vaultPosition.address0 = address1
            vaultPosition.address1 = address0
            vaultPosition.addresses = address1.toHex() + '-' + address0.toHex()
        } else {
            vaultPosition.address0 = address0
            vaultPosition.address1 = address1
            vaultPosition.addresses = address0.toHex() + '-' + address1.toHex()
        }

        vaultPosition.vault = vault.toHexString()
        vaultPosition.packedAddresses = packedAddr
        vaultPosition.currencyIdentifier = ccy
        vaultPosition.currency = ccy.toHexString()
        vaultPosition.lockedCollateral0 = BIG_INT_ZERO
        vaultPosition.lockedCollateral1 = BIG_INT_ZERO
        
        vaultPosition.save()
    }

    return vaultPosition as CollateralVaultPosition
}

export function getCollateralVaultPosition(
    address0: Address,
    address1: Address,
    vault: Bytes,
    ccy: Bytes
): CollateralVaultPosition {
    const packedAddr = packAddresses(address0, address1)
    const id = packedAddr.toHexString() + '-' + vault.toHexString() + '-' + ccy.toHexString()
    let vaultPosition = CollateralVaultPosition.load(id)

    if (!vaultPosition) {
        vaultPosition = createCollateralVaultPosition(address0, address1, vault, ccy)
    }

    return vaultPosition as CollateralVaultPosition
}

function createCollateralVault(vault: Address): CollateralVault {
    const vaultEntity = new CollateralVault(vault.toHexString())

    if (vaultEntity) {
        vaultEntity.address = vault
        vaultEntity.currency = ''
        vaultEntity.currencyIdentifier = ZERO_BYTES
        vaultEntity.tokenAddress = ZERO_BYTES
        vaultEntity.aggregator = ''
        vaultEntity.isSupported = true
      
        vaultEntity.save()
    }

    return vaultEntity as CollateralVault
}


export function getCollateralVault(vault: Address): CollateralVault {
    let vaultEntity = CollateralVault.load(vault.toHexString())

    if (!vaultEntity) {
        vaultEntity = createCollateralVault(vault)
    }

    return vaultEntity as CollateralVault
}