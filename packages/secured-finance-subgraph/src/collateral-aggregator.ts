import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CollateralUserContract} from "../generated/schema"
import { CollateralVault as CollateralVaultTemplate } from '../generated/templates'
import {
    LiquidationPriceUpdated, 
    MarginCallThresholdUpdated, 
    MinCollateralRatioUpdated, 
    AutoLiquidationThresholdUpdated,
    CollateralUserAdded,
    CollateralUserRemoved,
    CollateralVaultLinked,
    CollateralVaultRemoved,
    Register,
    UseUnsettledCollateral,
    ReleaseUnsettled,
    UseCollateral,
    Release,
    SettleCollateral,
    UpdatePV,
} from '../generated/CollateralAggregator/CollateralAggregator'

import { isFlippedAddresses } from "./helpers"
import { ADDRESS_ZERO, BIG_INT_ZERO } from "./constants"
import { 
    getCollateralAggregator, 
    getCollateralBilateralPosition, 
    getCollateralNetting, 
    getCollateralPosition, 
    getCollateralPositionCurrencyState, 
    getCollateralVault 
} from "./collateral-helpers"

export function handleCollateralLiquidationPriceUpdate(event: LiquidationPriceUpdated): void {
    let address = event.address
    const aggregator = getCollateralAggregator(address)

    if (aggregator) {
        aggregator.liquidationPrice = event.params.price
        aggregator.save()
    }
}

export function handleCollateralMarginCallUpdate(event: MarginCallThresholdUpdated): void {
    let address = event.address
    const aggregator = getCollateralAggregator(address)

    if (aggregator) {
        aggregator.marginCall = event.params.ratio
        aggregator.save()
    }
}

export function handleCollateralMinCollateralRatioUpdate(event: MinCollateralRatioUpdated): void {
    let address = event.address
    const aggregator = getCollateralAggregator(address)

    if (aggregator) {
        aggregator.minCollateralRequirements = event.params.price
        aggregator.save()
    }
}

export function handleCollateralAutoLiquidationRatioUpdate(event: AutoLiquidationThresholdUpdated): void {
    let address = event.address
    const aggregator = getCollateralAggregator(address)

    if (aggregator) {
        aggregator.autoLiquidation = event.params.ratio
        aggregator.save()
    }
}

export function handleCollateralUserAdded(event: CollateralUserAdded): void {
    let address = event.address
    const aggregator = getCollateralAggregator(address)

    if (aggregator) {
        let userContractAddress = event.params.user
        const collateralUserContract = new CollateralUserContract(userContractAddress.toHexString())

        if (collateralUserContract) {
            collateralUserContract.aggregator = address.toHexString()
            collateralUserContract.address = userContractAddress
            collateralUserContract.isSupported = true
            collateralUserContract.save()
        }
    }
}

export function handleCollateralUserRemoved(event: CollateralUserRemoved): void {
    let address = event.address
    const aggregator = getCollateralAggregator(address)

    if (aggregator) {
        let userContractAddress = event.params.user
        const collateralUserContract = CollateralUserContract.load(userContractAddress.toHexString())

        if (collateralUserContract) {
            collateralUserContract.aggregator = ADDRESS_ZERO.toHexString()
            collateralUserContract.isSupported = false
            collateralUserContract.save()
        }
    }
}

export function handleCollateralVaultLinked(event: CollateralVaultLinked): void {
    let address = event.address
    const aggregator = getCollateralAggregator(address)

    if (aggregator) {
        let vaultAddress = event.params.vault
        const collateralVault = getCollateralVault(vaultAddress)

        if (collateralVault) {
            collateralVault.currency = event.params.ccy.toHexString()
            collateralVault.currencyIdentifier = event.params.ccy
            collateralVault.tokenAddress = event.params.tokenAddress
            collateralVault.isSupported = true
            collateralVault.aggregator = address.toHexString()
            collateralVault.save()
            CollateralVaultTemplate.create(event.params.vault)

        }
    }
}

export function handleCollateralVaultRemoved(event: CollateralVaultRemoved): void {
    let address = event.address
    const aggregator = getCollateralAggregator(address)

    if (aggregator) {
        let vaultAddress = event.params.vault
        const collateralVault = getCollateralVault(vaultAddress)

        if (collateralVault) {
            collateralVault.isSupported = false
            collateralVault.aggregator = ADDRESS_ZERO.toHexString()
            collateralVault.save()
        }
    }
}

export function handleCollateralAggregatorRegistration(event: Register): void {
    const position = getCollateralPosition(event.params.addr)

    if (position) {
        position.isRegistered = true
        position.save()
    }
}

export function handleCollateralUnsettledUse(event: UseUnsettledCollateral): void {
    const position = getCollateralPosition(event.params.party)

    if (position) {
        let ccyPosition = getCollateralPositionCurrencyState(event.params.party, event.params.ccy)

        if (ccyPosition) {
            ccyPosition.unsettledPV = ccyPosition.unsettledPV.plus(event.params.amount)
            ccyPosition.save()
        }
    }
}

export function handleCollateralUnsettledRelease(event: ReleaseUnsettled): void {
    const position = getCollateralPosition(event.params.party)

    if (position) {
        let ccyPosition = getCollateralPositionCurrencyState(event.params.party, event.params.ccy)

        if (ccyPosition) {
            ccyPosition.unsettledPV = ccyPosition.unsettledPV.minus(event.params.amount)
            ccyPosition.save()
        }
    }
}

export function handleCollateralPositionUse(event: UseCollateral): void {
    const position = getCollateralBilateralPosition(event.params.partyA, event.params.partyB)

    if (position) {
        let netting = getCollateralNetting(event.params.partyA, event.params.partyB, event.params.ccy)
        let flipped = isFlippedAddresses(event.params.partyA, event.params.partyB)

        if (netting) {
            let amount0: BigInt
            let amount1: BigInt
            let address0: Bytes
            let address1: Bytes
            let addresses: string
            let isSettled = event.params.isSettled

            if (flipped) {
                address0 = event.params.partyB
                address1 = event.params.partyA
                addresses = event.params.partyB.toHex() + '-' + event.params.partyA.toHex()
                amount0 = event.params.amount1
                amount1 = event.params.amount0
            } else {
                address0 = event.params.partyA
                address1 = event.params.partyB
                addresses = event.params.partyA.toHex() + '-' + event.params.partyB.toHex()
                amount0 = event.params.amount0
                amount1 = event.params.amount1
            }
    
            if (netting.address0 == ADDRESS_ZERO) {
                netting.address0 = address0
                netting.address1 = address1
                netting.addresses = addresses
            }

            if (amount0.gt(BIG_INT_ZERO)) {
                if (isSettled) {
                    netting.party0PV = netting.party0PV.plus(amount0)
                } else { 
                    netting.unsettled0PV = netting.unsettled0PV.plus(amount0)
                }
            }

            if (amount1.gt(BIG_INT_ZERO)) {
                if (isSettled) {
                    netting.party1PV = netting.party1PV.plus(amount1)
                } else { 
                    netting.unsettled1PV = netting.unsettled1PV.plus(amount1) 
                }
            }

            netting.save()
        }
    }
}

export function handleCollateralPositionRelease(event: Release): void {
    const position = getCollateralBilateralPosition(event.params.partyA, event.params.partyB)

    if (position) {
        let netting = getCollateralNetting(event.params.partyA, event.params.partyB, event.params.ccy)
        let flipped = isFlippedAddresses(event.params.partyA, event.params.partyB)

        if (netting) {
            let amount0: BigInt
            let amount1: BigInt
            let isSettled = event.params.isSettled

            if (flipped) {
                amount0 = event.params.amount1
                amount1 = event.params.amount0
            } else {
                amount0 = event.params.amount0
                amount1 = event.params.amount1
            }

            if (amount0.gt(BIG_INT_ZERO)) {
                if (isSettled) {
                    netting.party0PV = netting.party0PV.minus(amount0)
                } else {
                    netting.unsettled0PV = netting.unsettled0PV.minus(amount0)
                }
            }

            if (amount1.gt(BIG_INT_ZERO)) {
                if (isSettled) {
                    netting.party1PV = netting.party1PV.minus(amount1)
                } else {
                    netting.unsettled1PV = netting.unsettled1PV.minus(amount1)
                }
            }

            netting.save()
        }
    }
}

export function handleCollateralPositionSettle(event: SettleCollateral): void {
    const position = getCollateralBilateralPosition(event.params.partyA, event.params.partyB)

    if (position) {
        let netting = getCollateralNetting(event.params.partyA, event.params.partyB, event.params.ccy)
        let flipped = isFlippedAddresses(event.params.partyA, event.params.partyB)

        if (netting) {
            let amount0: BigInt
            let amount1: BigInt

            if (flipped) {
                amount0 = event.params.amount1
                amount1 = event.params.amount0
            } else {
                amount0 = event.params.amount0
                amount1 = event.params.amount1
            }

            if (amount0.gt(BIG_INT_ZERO)) {
                netting.unsettled0PV = netting.unsettled0PV.minus(amount0);
                netting.party0PV = netting.party0PV.plus(amount0);
            }
            if (amount1.gt(BIG_INT_ZERO)) {
                netting.unsettled1PV = netting.unsettled1PV.minus(amount1);
                netting.party1PV = netting.party1PV.plus(amount1);
            }

            netting.save()
        }
    }
}

export function handleCollateralPositionUpdatePV(event: UpdatePV): void {
    const position = getCollateralBilateralPosition(event.params.partyA, event.params.partyB)

    if (position) {
        let netting = getCollateralNetting(event.params.partyA, event.params.partyB, event.params.ccy)
        let flipped = isFlippedAddresses(event.params.partyA, event.params.partyB)

        if (netting) {
            let currentPV0: BigInt
            let currentPV1: BigInt
            let prevPV0: BigInt
            let prevPV1: BigInt

            if (flipped) {
                currentPV0 = event.params.currentPV1
                currentPV1 = event.params.currentPV0
                prevPV0 = event.params.prevPV1
                prevPV1 = event.params.prevPV0
            } else {
                currentPV0 = event.params.currentPV0
                currentPV1 = event.params.currentPV1
                prevPV0 = event.params.prevPV0
                prevPV1 = event.params.prevPV1
            }

            if (currentPV0.gt(BIG_INT_ZERO)) {
                netting.party0PV = netting.party0PV.minus(prevPV0).plus(currentPV0);
            }
            if (currentPV1.gt(BIG_INT_ZERO)) {
                netting.party1PV = netting.party1PV.minus(prevPV1).plus(currentPV1);
            }

            netting.save()
        }
    }
}
