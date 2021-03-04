import { Address, BigDecimal, BigInt, Bytes, ethereum, log } from '@graphprotocol/graph-ts'
import { Collateral as CollateralContract, SetColBook, UpSizeETH, UpSizeFIL, ConfirmUpSizeFIL, DelColBook, PartialLiquidation } from '../generated/Collateral/Collateral'
import { Collateral, } from '../generated/schema'
import { BIG_DECIMAL_1E18, BIG_DECIMAL_AUTO_LIQUIDATION_LEVEL, BIG_DECIMAL_MARGIN_CALL_LEVEL, BIG_DECIMAL_PERCENT_BASE, BIG_DECIMAL_ZERO, BIG_INT_AUTO_LIQUIDATION_LEVEL, BIG_INT_BASIS_POINTS, BIG_INT_MARGIN_CALL_LEVEL, BIG_INT_PERCENT_BASE, BIG_INT_ZERO, EMPTY_STRING } from './constants'
import { getUser } from './user'

function getCollateralBook(id: string, colID: string, filAddr: Bytes, usdcAddr: Bytes, ethAddr: Bytes, deposit: BigInt, time: BigInt): Collateral {
    let collateralBook = Collateral.load(id)
  
    if (collateralBook === null) {
        collateralBook = emptyCollateralBook(id, colID, filAddr, usdcAddr, ethAddr, deposit, time)
    }
  
    return collateralBook as Collateral
}

function emptyCollateralBook(id: string, collateralID: string, filAddr: Bytes, usdcAddr: Bytes, ethAddr: Bytes, deposit: BigInt, createdAt: BigInt): Collateral {
    let collateralBook = new Collateral(id)
    collateralBook.user = ethAddr.toHex()
    collateralBook.userAddressETH = ethAddr
    collateralBook.userAddressFIL = filAddr
    collateralBook.userAddressUSDC = usdcAddr
    collateralBook.collateralID = collateralID
    collateralBook.collateralAddressFIL = EMPTY_STRING
    collateralBook.collateralAddressUSDC = EMPTY_STRING
    collateralBook.collateralAmountFIL = BIG_INT_ZERO
    collateralBook.collateralAmountFILinETH = BIG_INT_ZERO
    collateralBook.collateralAmountUSDC = BIG_INT_ZERO
    collateralBook.collateralAmountUSDCinETH = BIG_INT_ZERO
    collateralBook.inuseETH = BIG_INT_ZERO
    collateralBook.inuseFIL = BIG_INT_ZERO
    collateralBook.inuseFILinETH = BIG_INT_ZERO
    collateralBook.inuseUSDC = BIG_INT_ZERO
    collateralBook.inuseUSDCinETH = BIG_INT_ZERO
    collateralBook.coverage = BIG_INT_ZERO
    collateralBook.isAvailable = true
    collateralBook.createdAt = createdAt
    collateralBook.updatedAt = BIG_INT_ZERO
    collateralBook.filDepositTxHash = EMPTY_STRING

    const user = getUser(ethAddr as Address, createdAt)

    if (deposit.gt(BigInt.fromI32(0))) {
        collateralBook.state = 1
        collateralBook.collateralAmountETH = deposit

        let updatedTotalCollateral = user.totalCollateralInETH.plus(deposit)
        user.totalCollateralInETH = updatedTotalCollateral
    } else {
        collateralBook.state = 0
        collateralBook.collateralAmountETH = BIG_INT_ZERO
    }
    user.save()

    return collateralBook as Collateral
}

export function handleSetCollateralBook(event: SetColBook): void {
    let collateralBook = getCollateralBook(
        event.transaction.from.toHex(), 
        event.params.id.toHex(),
        event.params.userAddrFIL,
        event.params.userAddrUSDC,
        event.transaction.from,
        event.transaction.value,
        event.block.timestamp
    )
    
    if (collateralBook.createdAt != event.block.timestamp) {
        collateralBook.collateralID = event.params.id.toHex()
        collateralBook.userAddressFIL = event.params.userAddrFIL
        collateralBook.userAddressUSDC = event.params.userAddrUSDC
        collateralBook.updatedAt = event.block.timestamp
    }

    collateralBook.save()
}

function updateCollateralBookState(id: string): void {
    let collateralBook = Collateral.load(id)
    // TODO: add update amounts for FIL and USDC in ETH
    // and handle FIL deposits txHashes
    let totalInUse = collateralBook.inuseETH
                        .plus(collateralBook.inuseFILinETH)
                        .plus(collateralBook.inuseUSDCinETH)

    let totalAmounts = collateralBook.collateralAmountETH
                        .plus(collateralBook.collateralAmountFILinETH)
                        .plus(collateralBook.collateralAmountUSDCinETH)

    if (totalInUse.equals(BIG_INT_ZERO)) {
        collateralBook.coverage = BIG_INT_ZERO
        if (totalAmounts.equals(BIG_INT_ZERO)) {
            collateralBook.state = 0
        } else {
            collateralBook.state = 1
        }
    } else {
        let coverage = BIG_INT_PERCENT_BASE.times(totalAmounts).div(totalInUse)
        collateralBook.coverage = coverage
        if (collateralBook.state = 4) {
            collateralBook.save()
        } else if (collateralBook.coverage.le(BIG_INT_AUTO_LIQUIDATION_LEVEL)) {
            collateralBook.state = 4
        } else if (collateralBook.coverage.gt(BIG_INT_AUTO_LIQUIDATION_LEVEL)) {
            collateralBook.state = 3
        } else if (collateralBook.coverage.gt(BIG_INT_MARGIN_CALL_LEVEL)) {
            collateralBook.state = 2
        }
    }
    
    collateralBook.save()
}

export function handleUpSizeETH(event: UpSizeETH): void {
    let collateralBook = Collateral.load(event.transaction.from.toHex())
    let updatedAmountETH = collateralBook.collateralAmountETH.plus(event.transaction.value)
    const user = getUser(event.transaction.from, event.block.timestamp)

    let updatedTotalCollateral = user.totalCollateralInETH.plus(event.transaction.value)
    user.totalCollateralInETH = updatedTotalCollateral
    user.save()

    collateralBook.collateralAmountETH = updatedAmountETH
    collateralBook.save()

    updateCollateralBookState(event.transaction.from.toHex())
}

export function handleUpSizeFIL(event: UpSizeFIL): void {
    let collateralBook = Collateral.load(event.transaction.from.toHex())
  
    collateralBook.filDepositTxHash = event.params.txHash
    collateralBook.save()
    updateCollateralBookState(event.transaction.from.toHex())
}

export function handleConfirmUpSizeFIL(event: ConfirmUpSizeFIL): void {
    let collateralBook = Collateral.load(event.transaction.from.toHex())
  
    collateralBook.collateralAmountFIL = collateralBook.collateralAmountFIL.plus(event.params.amt)
    collateralBook.filDepositTxHash = EMPTY_STRING
    collateralBook.save()
    // TODO: add amount FIL in ETH and totalCollateralInEth
    updateCollateralBookState(event.transaction.from.toHex())
}

export function handleDeleteCollateralBook(event: DelColBook): void {
    let collateralBook = Collateral.load(event.transaction.from.toHex())
  
  //collateralID: string, filAddr: Bytes, usdcAddr: Bytes, deposit: BigDecimal, createdAt: BigInt
    collateralBook = emptyCollateralBook(
        collateralBook.id, 
        collateralBook.collateralID, 
        collateralBook.userAddressFIL,
        collateralBook.userAddressUSDC,
        event.transaction.from,
        BIG_INT_ZERO,
        collateralBook.createdAt
    )

    collateralBook.save()
}


export function handlePartialLiquidation(event: PartialLiquidation): void {
    let lenderBook = Collateral.load(event.params.lender.toHex())
    let borrowerBook = Collateral.load(event.params.borrower.toHex())

    // TODO: get exchange rates from FxMarket
    let ethAmount = BIG_INT_ZERO

    if (borrowerBook.state == 1 ||
        borrowerBook.state == 2 ||
        borrowerBook.state == 5       
    ) {
        borrowerBook.state = 4
        borrowerBook.collateralAmountETH = borrowerBook.collateralAmountETH.minus(ethAmount)
        
        lenderBook.collateralAmountETH = lenderBook.collateralAmountETH.plus(ethAmount)
        updateCollateralBookState(event.transaction.from.toHex())
        updateCollateralBookState(event.transaction.from.toHex())
    }
}