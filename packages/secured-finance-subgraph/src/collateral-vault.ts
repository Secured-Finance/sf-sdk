import { 
    Deposit,
    PositionDeposit,
    Withdraw,
    PositionWithdraw, 
    RebalanceTo,
    RebalanceFrom,
    RebalanceBetween,
    Liquidate,
    LiquidateIndependent
} from '../generated/templates/CollateralVault/CollateralVault'
import { isFlippedAddresses } from "./helpers"
import { getCollateralBook, getCollateralVault, getCollateralVaultPosition } from "./collateral-helpers"
import { Address } from '@graphprotocol/graph-ts'

export function handleCollateralVaultDeposit(event: Deposit): void {
    const vaultAddress = event.address
    const vault = getCollateralVault(vaultAddress)

    if (vault) {
        const book = getCollateralBook(
            event.params.user,
            vault.address,
            vault.currencyIdentifier
        )

        book.independentCollateral = book.independentCollateral.plus(event.params.amount)
        book.save()
    }
}

export function handleCollateralVaultDepositInPosition(event: PositionDeposit): void {
    const vaultAddress = event.address
    const vault = getCollateralVault(vaultAddress)

    if (vault) {
        const book = getCollateralBook(
            event.params.user,
            vault.address,
            vault.currencyIdentifier
        )

        book.lockedCollateral = book.lockedCollateral.plus(event.params.amount)
        book.save()

        let flipped = isFlippedAddresses(event.params.user, event.params.counterparty)
        const vaultPosition = getCollateralVaultPosition(
            event.params.user,
            event.params.counterparty,
            vault.address,
            vault.currencyIdentifier
        )

        if (vaultPosition) {
            if (flipped) {
                vaultPosition.lockedCollateral1 = vaultPosition.lockedCollateral1.plus(event.params.amount)
            } else {
                vaultPosition.lockedCollateral0 = vaultPosition.lockedCollateral0.plus(event.params.amount)
            }

            vaultPosition.save()
        }
    }
}

export function handleCollateralVaultWithdraw(event: Withdraw): void {
    const vaultAddress = event.address
    const vault = getCollateralVault(vaultAddress)

    if (vault) {
        const book = getCollateralBook(
            event.params.from,
            vault.address,
            vault.currencyIdentifier
        )

        book.independentCollateral = book.independentCollateral.minus(event.params.amount)
        book.save()
    }
}

export function handleCollateralVaultWithdrawFromPosition(event: PositionWithdraw): void {
    const vaultAddress = event.address
    const vault = getCollateralVault(vaultAddress)

    if (vault) {
        const book = getCollateralBook(
            event.params.from,
            vault.address,
            vault.currencyIdentifier
        )

        book.lockedCollateral = book.lockedCollateral.minus(event.params.amount)


        let flipped = isFlippedAddresses(event.params.from, event.params.counterparty)
        const vaultPosition = getCollateralVaultPosition(
            event.params.from,
            event.params.counterparty,
            vault.address,
            vault.currencyIdentifier
        )

        if (vaultPosition) {
            if (flipped) {
                vaultPosition.lockedCollateral1 = vaultPosition.lockedCollateral1.minus(event.params.amount)
            } else {
                vaultPosition.lockedCollateral0 = vaultPosition.lockedCollateral0.minus(event.params.amount)
            }            
        }

        vaultPosition.save()

        
        book.save()
    }
}

export function handleCollateralVaultRebalanceTo(event: RebalanceTo): void {
    const vaultAddress = event.address
    const vault = getCollateralVault(vaultAddress)

    if (vault) {
        const book = getCollateralBook(
            event.params.user,
            vault.address,
            vault.currencyIdentifier
        )

        book.independentCollateral = book.independentCollateral.minus(event.params.amount)
        book.lockedCollateral = book.lockedCollateral.plus(event.params.amount)
        book.save()

        let flipped = isFlippedAddresses(event.params.user, event.params.counterparty)
        const vaultPosition = getCollateralVaultPosition(
            event.params.user,
            event.params.counterparty,
            vault.address,
            vault.currencyIdentifier
        )

        if (vaultPosition) {
            if (flipped) {
                vaultPosition.lockedCollateral1 = vaultPosition.lockedCollateral1.plus(event.params.amount)
            } else {
                vaultPosition.lockedCollateral0 = vaultPosition.lockedCollateral0.plus(event.params.amount)
            }            
        }

        vaultPosition.save()

    }
}

export function handleCollateralVaultRebalanceFrom(event: RebalanceFrom): void {
    const vaultAddress = event.address
    const vault = getCollateralVault(vaultAddress)

    if (vault) {
        const book = getCollateralBook(
            event.params.user,
            vault.address,
            vault.currencyIdentifier
        )

        if (book) {
            book.independentCollateral = book.independentCollateral.plus(event.params.amount)
            book.lockedCollateral = book.lockedCollateral.minus(event.params.amount)
            book.save()       
        }

        let flipped = isFlippedAddresses(event.params.user, event.params.counterparty)
        const vaultPosition = getCollateralVaultPosition(
            event.params.user,
            event.params.counterparty,
            vault.address,
            vault.currencyIdentifier
        )

        if (vaultPosition) {
            if (flipped) {
                vaultPosition.lockedCollateral1 = vaultPosition.lockedCollateral1.minus(event.params.amount)
            } else {
                vaultPosition.lockedCollateral0 = vaultPosition.lockedCollateral0.minus(event.params.amount)
            }            
        }

        vaultPosition.save()

    }
}

export function handleCollateralVaultRebalanceBetween(event: RebalanceBetween): void {
    const vaultAddress = event.address
    const vault = getCollateralVault(vaultAddress)

    if (vault) {
        let flipped = isFlippedAddresses(event.params.user, event.params.fromCounterparty)
        let vaultPosition = getCollateralVaultPosition(
            event.params.user,
            event.params.fromCounterparty,
            vault.address,
            vault.currencyIdentifier
        )

        if (vaultPosition) {
            if (flipped) {
                vaultPosition.lockedCollateral1 = vaultPosition.lockedCollateral1.minus(event.params.amount)
            } else {
                vaultPosition.lockedCollateral0 = vaultPosition.lockedCollateral0.minus(event.params.amount)
            }
        }

        flipped = isFlippedAddresses(event.params.user, event.params.toCounterparty)
        vaultPosition = getCollateralVaultPosition(
            event.params.user,
            event.params.toCounterparty,
            vault.address,
            vault.currencyIdentifier
        )

        if (vaultPosition) {
            if (flipped) {
                vaultPosition.lockedCollateral1 = vaultPosition.lockedCollateral1.plus(event.params.amount)
            } else {
                vaultPosition.lockedCollateral0 = vaultPosition.lockedCollateral0.plus(event.params.amount)
            }
        }

        vaultPosition.save()

    }
}

export function handleCollateralVaultLiquidation(event: Liquidate): void {
    const vaultAddress = event.address
    const vault = getCollateralVault(vaultAddress)

    if (vault) {
        let book = getCollateralBook(
            event.params.from,
            vault.address,
            vault.currencyIdentifier
        )

        if (book) {
            book.lockedCollateral = book.lockedCollateral.minus(event.params.amount)
            book.save()       
        }

        book = getCollateralBook(
            event.params.to,
            vault.address,
            vault.currencyIdentifier
        )

        if (book) {
            book.lockedCollateral = book.lockedCollateral.plus(event.params.amount)
            book.save()       
        }

        let flipped = isFlippedAddresses(event.params.from, event.params.to)
        const vaultPosition = getCollateralVaultPosition(
            event.params.from,
            event.params.to,
            vault.address,
            vault.currencyIdentifier
        )

        if (vaultPosition) {
            if (flipped) {
                vaultPosition.lockedCollateral1 = vaultPosition.lockedCollateral1.minus(event.params.amount)
                vaultPosition.lockedCollateral0 = vaultPosition.lockedCollateral0.plus(event.params.amount)
            } else {
                vaultPosition.lockedCollateral0 = vaultPosition.lockedCollateral0.minus(event.params.amount)
                vaultPosition.lockedCollateral1 = vaultPosition.lockedCollateral1.plus(event.params.amount)
            }

            vaultPosition.save()
        }
    }
}

export function handleCollateralVaultLiquidationIndependent(event: LiquidateIndependent): void {
    const vaultAddress = event.address
    const vault = getCollateralVault(vaultAddress)

    if (vault) {
        let book = getCollateralBook(
            event.params.from,
            vault.address,
            vault.currencyIdentifier
        )

        if (book) {
            book.independentCollateral = book.independentCollateral.minus(event.params.amount)
            book.save()       
        }

        book = getCollateralBook(
            event.params.to,
            vault.address,
            vault.currencyIdentifier
        )

        if (book) {
            book.lockedCollateral = book.lockedCollateral.plus(event.params.amount)
            book.save()       
        }

        let flipped = isFlippedAddresses(event.params.to, event.params.from)
        const vaultPosition = getCollateralVaultPosition(
            event.params.to,
            event.params.from,
            vault.address,
            vault.currencyIdentifier
        )

        if (vaultPosition) {
            if (flipped) {
                vaultPosition.lockedCollateral1 = vaultPosition.lockedCollateral1.plus(event.params.amount)
            } else {
                vaultPosition.lockedCollateral0 = vaultPosition.lockedCollateral0.plus(event.params.amount)
            }

            vaultPosition.save()
        }

    }
}