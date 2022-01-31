// import { Address, BigDecimal, BigInt, Bytes, ethereum, log } from '@graphprotocol/graph-ts'
// import { Collateral as CollateralContract, Register, Deposit, Withdraw, Release, UseCollateral, UpdateFILAddress, UpdateBTCAddress, PartialLiquidation, UpdateState } from '../generated/Collateral/Collateral'
// import { Collateral, Price, } from '../generated/schema'
// import { BIG_DECIMAL_1E18, BIG_DECIMAL_AUTO_LIQUIDATION_LEVEL, BIG_DECIMAL_MARGIN_CALL_LEVEL, BIG_DECIMAL_PERCENT_BASE, BIG_DECIMAL_ZERO, BIG_INT_AUTO_LIQUIDATION_LEVEL, BIG_INT_BASIS_POINTS, BIG_INT_DECIMAL_BASE, BIG_INT_MARGIN_CALL_LEVEL, BIG_INT_PERCENT_BASE, BIG_INT_ZERO, BTC_ETH_PRICE_FEED_ADDR, EMPTY_STRING, FIL_ETH_PRICE_FEED_ADDR, USDC_ETH_PRICE_FEED_ADDR } from './constants'
// import { getPriceFeed } from './priceFeed'
// import { getUser } from './user'

// function getCollateralBook(id: Bytes, colID: string, filAddr: string, btcAddr: string, deposit: BigInt, time: BigInt): Collateral {
//     let collateralBook = Collateral.load(id.toHex())
  
//     if (collateralBook === null) {
//         collateralBook = createCollateralBook(id, colID, filAddr, btcAddr, deposit, time)
//     }
  
//     return collateralBook as Collateral
// }

// function createCollateralBook(id: Bytes, collateralID: string, filAddr: string, btcAddr: string, deposit: BigInt, createdAt: BigInt): Collateral {
//     let collateralBook = new Collateral(id.toHex())
//     collateralBook.collateralID = collateralID
//     collateralBook.user = id.toHex()
//     collateralBook.userAddrFIL = filAddr
//     collateralBook.userAddrBTC = btcAddr
//     collateralBook.collateralAmountETH = deposit
//     collateralBook.inuseETH = BIG_INT_ZERO
//     collateralBook.inuseFIL = BIG_INT_ZERO
//     collateralBook.inuseUSDC = BIG_INT_ZERO
//     collateralBook.inuseBTC = BIG_INT_ZERO
//     collateralBook.coverage = BIG_INT_ZERO
//     collateralBook.isAvailable = true
//     collateralBook.createdAt = createdAt
//     collateralBook.updatedAt = BIG_INT_ZERO

//     const user = getUser(id as Address, createdAt)

//     if (deposit.gt(BigInt.fromI32(0))) {
//         collateralBook.state = 1
//         collateralBook.collateralAmountETH = deposit

//         let updatedTotalCollateral = user.totalCollateralInETH.plus(deposit)
//         user.totalCollateralInETH = updatedTotalCollateral
//     } else {
//         collateralBook.state = 0
//         collateralBook.collateralAmountETH = BIG_INT_ZERO
//     }
//     user.save()

//     return collateralBook as Collateral
// }

// export function handleRegisterCollateralBook(event: Register): void {
//     let collateralBook = getCollateralBook(
//         event.transaction.from, 
//         event.params.id,
//         event.params.userAddrFIL,
//         event.params.userAddrBTC,
//         event.transaction.value,
//         event.block.timestamp
//     )
    
//     if (collateralBook.createdAt != event.block.timestamp) {
//         collateralBook.collateralID = event.params.id
//         collateralBook.userAddrFIL = event.params.userAddrFIL
//         collateralBook.userAddrBTC = event.params.userAddrBTC
//         collateralBook.updatedAt = event.block.timestamp
//     }

//     collateralBook.save()
// }

// function calculatePVinETH(id: string): BigInt {
//     let collateralBook = Collateral.load(id)

//     let totalPVinETH: BigInt

//     if (collateralBook.inuseFIL.gt(BIG_INT_ZERO)) {
//         let priceFeed = getPriceFeed(FIL_ETH_PRICE_FEED_ADDR)
//         let price = Price.load(priceFeed.latestPrice) 
//         let pvInETH = collateralBook.inuseFIL.times(price.price).div(BIG_INT_DECIMAL_BASE)

//         totalPVinETH = totalPVinETH.plus(pvInETH)
//     }
//     if (collateralBook.inuseUSDC.gt(BIG_INT_ZERO)) {
//         let priceFeed = getPriceFeed(USDC_ETH_PRICE_FEED_ADDR)
//         let price = Price.load(priceFeed.latestPrice) 
//         let pvInETH = collateralBook.inuseFIL.times(price.price).div(BIG_INT_DECIMAL_BASE)

//         totalPVinETH = totalPVinETH.plus(pvInETH)
//     }
//     if (collateralBook.inuseBTC.gt(BIG_INT_ZERO)) {
//         let priceFeed = getPriceFeed(BTC_ETH_PRICE_FEED_ADDR)
//         let price = Price.load(priceFeed.latestPrice) 
//         let pvInETH = collateralBook.inuseFIL.times(price.price).div(BIG_INT_DECIMAL_BASE)

//         totalPVinETH = totalPVinETH.plus(pvInETH)
//     }

//     totalPVinETH = totalPVinETH.plus(collateralBook.inuseETH)
//     return totalPVinETH
// }

// function updateCollateralCoverage(id: string): void {
//     let collateralBook = Collateral.load(id)
//     let totalInUse = calculatePVinETH(id)

//     collateralBook.coverage = BIG_INT_PERCENT_BASE.times(collateralBook.collateralAmountETH).div(totalInUse)
//     collateralBook.save()
// }

// function calculateCollateralState(id: string): void {
//     let collateralBook = Collateral.load(id)
//     let totalInUse = calculatePVinETH(id)
//     let totalAmounts = collateralBook.collateralAmountETH
//     updateCollateralCoverage(id)

//     if (totalInUse.equals(BIG_INT_ZERO)) {
//         collateralBook.coverage = BIG_INT_ZERO
//         if (totalAmounts.equals(BIG_INT_ZERO)) {
//             collateralBook.state = 0
//         } else {
//             collateralBook.state = 1
//         }
//     } else {
//         let coverage = BIG_INT_PERCENT_BASE.times(totalAmounts).div(totalInUse)
//         collateralBook.coverage = coverage
//         if (collateralBook.state = 4) {
//             collateralBook.save()
//         } else if (collateralBook.coverage.le(BIG_INT_AUTO_LIQUIDATION_LEVEL)) {
//             collateralBook.state = 5
//         } else if (collateralBook.coverage.gt(BIG_INT_AUTO_LIQUIDATION_LEVEL)) {
//             collateralBook.state = 3
//         } else if (collateralBook.coverage.gt(BIG_INT_MARGIN_CALL_LEVEL)) {
//             collateralBook.state = 2
//         }
//     }
    
//     collateralBook.save()
// }

// export function handleDepositCollateral(event: Deposit): void {
//     let collateralBook = Collateral.load(event.transaction.from.toHex())
//     let updatedAmountETH = collateralBook.collateralAmountETH.plus(event.params.amount)
//     const user = getUser(event.transaction.from, event.block.timestamp)

//     let updatedTotalCollateral = user.totalCollateralInETH.plus(event.params.amount)
//     user.totalCollateralInETH = updatedTotalCollateral
//     user.save()

//     collateralBook.collateralAmountETH = updatedAmountETH
//     collateralBook.save()

//     calculateCollateralState(event.transaction.from.toHex())
// }

// export function handleWithdrawCollateral(event: Withdraw): void {
//     let collateralBook = Collateral.load(event.transaction.from.toHex())
//     let updatedAmountETH = collateralBook.collateralAmountETH.minus(event.params.amount)

//     collateralBook.collateralAmountETH = updatedAmountETH
//     collateralBook.save()

//     calculateCollateralState(event.transaction.from.toHex())
// }

// export function handleUpdateFILAddress(event: UpdateFILAddress): void {
//     let collateralBook = Collateral.load(event.params.addr.toHex())
//     collateralBook.userAddrFIL = event.params.filAddr

//     collateralBook.save()
//     calculateCollateralState(event.transaction.from.toHex())
// }

// export function handleUpdateBTCAddress(event: UpdateBTCAddress): void {
//     let collateralBook = Collateral.load(event.params.addr.toHex())
//     collateralBook.userAddrBTC = event.params.btcAddr

//     collateralBook.save()
//     calculateCollateralState(event.transaction.from.toHex())
// }

// export function handleReleaseCollateral(event: Release): void {
//     let collateralBook = Collateral.load(event.params.addr.toHex())
  
//     if (event.params.ccy == 0) {
//         collateralBook.inuseETH = collateralBook.inuseETH.minus(event.params.amount)
//     } else if (event.params.ccy == 1) {
//         collateralBook.inuseFIL = collateralBook.inuseFIL.minus(event.params.amount)
//     } else if (event.params.ccy == 2) {
//         collateralBook.inuseUSDC = collateralBook.inuseUSDC.minus(event.params.amount)
//     } else if (event.params.ccy == 3) {
//         collateralBook.inuseBTC = collateralBook.inuseBTC.minus(event.params.amount)
//     }

//     collateralBook.save()
//     calculateCollateralState(event.transaction.from.toHex())
// }

// export function handleUseCollateral(event: UseCollateral): void {
//     let collateralBook = Collateral.load(event.params.addr.toHex())
  
//     if (event.params.ccy == 0) {
//         collateralBook.inuseETH = collateralBook.inuseETH.plus(event.params.amount)
//     } else if (event.params.ccy == 1) {
//         collateralBook.inuseFIL = collateralBook.inuseFIL.plus(event.params.amount)
//     } else if (event.params.ccy == 2) {
//         collateralBook.inuseUSDC = collateralBook.inuseUSDC.plus(event.params.amount)
//     } else if (event.params.ccy == 3) {
//         collateralBook.inuseBTC = collateralBook.inuseBTC.plus(event.params.amount)
//     }

//     collateralBook.save()
//     calculateCollateralState(event.transaction.from.toHex())
// }

// export function handleUpdateState(event: UpdateState): void {
//     let collateralBook = Collateral.load(event.params.addr.toHex())
//     if (collateralBook.state == event.params.prevState) {
//         collateralBook.state = event.params.currState
//     }

//     collateralBook.save()
// }

// export function handlePartialLiquidation(event: PartialLiquidation): void {
//     let lenderBook = Collateral.load(event.params.lender.toHex())
//     let borrowerBook = Collateral.load(event.params.borrower.toHex())

//     if (borrowerBook.state == 1 ||
//         borrowerBook.state == 2 ||
//         borrowerBook.state == 5       
//     ) {
//         borrowerBook.state = 4
//         borrowerBook.collateralAmountETH = borrowerBook.collateralAmountETH.minus(event.params.amount)
//         lenderBook.collateralAmountETH = lenderBook.collateralAmountETH.plus(event.params.amount)
//         calculateCollateralState(event.transaction.from.toHex())
//         calculateCollateralState(event.transaction.from.toHex())
//     }

//     let lender = getUser(event.params.lender, event.block.timestamp)
//     let borrower = getUser(event.params.borrower, event.block.timestamp)

//     let updatedTotalCollateral = lender.totalCollateralInETH.plus(event.params.amount)
//     lender.totalCollateralInETH = updatedTotalCollateral

//     let updatedLiquidatedCollateral = borrower.totalLiquidatedCollateralInETH.plus(event.params.amount)
//     borrower.totalLiquidatedCollateralInETH = updatedLiquidatedCollateral
    
//     borrower.save()
//     lender.save()
//     lenderBook.save()
//     borrowerBook.save()
// }