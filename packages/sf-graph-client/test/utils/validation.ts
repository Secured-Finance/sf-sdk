// eslint-disable  @typescript-eslint/no-explicit-any
import { expectType } from './types';

export const validateCrosschainAddress = crosschainAddress => {
    expectType(crosschainAddress.id, 'string');
    expectType(crosschainAddress.chainId, 'string');
    expectType(crosschainAddress.ethAddress, 'string');
    expectType(crosschainAddress.address, 'string');
};

export const validateProduct = product => {
    expectType(product.id, 'string');
    expectType(product.prefix, 'string');
    expectType(product.productController, 'string');
    expectType(product.productImplementation, 'string');
};

export const validateTerm = term => {
    expectType(term.id, 'string');
    expectType(term.daysNum, 'string');
    expectType(term.dfFrac, 'string');
    expectType(term.paymentNum, 'string');
};

export const validateCurrency = currency => {
    expectType(currency.chainId, 'number');
    expectType(currency.id, 'string');
    expectType(currency.identifier, 'string');
    expectType(currency.isCollateral, 'boolean');
    expectType(currency.isSupported, 'boolean');
    expectType(currency.ltv, 'string');
    expectType(currency.minMargin, 'string');
    expectType(currency.name, 'string');
    expectType(currency.shortName, 'string');
};

export const validateLoan = loan => {
    expectType(loan.id, 'string');
    expectType(loan.lender, 'string');
    expectType(loan.borrower, 'string');
    expectType(loan.couponPayment, 'string');
    expectType(loan.notional, 'string');
    expectType(loan.presentValue, 'string');
    expectType(loan.startTimestamp, 'string');
    expectType(loan.endTimestamp, 'string');
    expectType(loan.term, 'string');
    expectType(loan.state, 'number');
    expectType(loan.rate, 'string');
};

export const validateLoanPaymentSchedule = payment => {
    expectType(payment.id, 'string');
    expectType(payment.notice, 'string');
    expectType(payment.payment, 'string');
    expectType(payment.amount, 'string');
    expectType(payment.isDone, 'boolean');
    expectType(payment.txHash, 'string');
};

export const validateLoanNovation = novation => {
    expectType(novation.id, 'string');
    expectType(novation.previousLender, 'string');
    expectType(novation.newLender, 'string');
    expectType(novation.novationDate, 'string');
};

export const validateLoanTermination = termination => {
    expectType(termination.id, 'string');
    expectType(termination.terminationAsker, 'string');
    expectType(termination.terminationSubmitter, 'string');
    expectType(termination.terminationDate, 'string');
    expectType(termination.repayment, 'string');
};

export const validateCloseOutNetting = closeOutNetting => {
    expectType(closeOutNetting.address0, 'string');
    expectType(closeOutNetting.address1, 'string');
    expectType(closeOutNetting.addresses, 'string');
    expectType(closeOutNetting.packedAddresses, 'string');
    expectType(closeOutNetting.aggregatedPayment0, 'string');
    expectType(closeOutNetting.aggregatedPayment1, 'string');
    expectType(closeOutNetting.netPayment, 'string');
    expectType(closeOutNetting.flipped, 'boolean');
};

export const validateTimeSlot = timeSlot => {
    expectType(timeSlot.id, 'string');
    expectType(timeSlot.address0, 'string');
    expectType(timeSlot.address1, 'string');
    expectType(timeSlot.addresses, 'string');
    expectType(timeSlot.totalPayment0, 'string');
    expectType(timeSlot.totalPayment1, 'string');
    expectType(timeSlot.netPayment, 'string');
    expectType(timeSlot.paidAmount, 'string');
    expectType(timeSlot.day, 'string');
    expectType(timeSlot.month, 'string');
    expectType(timeSlot.year, 'string');
    expectType(timeSlot.isSettled, 'boolean');
    expectType(timeSlot.position, 'string');
    expectType(timeSlot.flipped, 'boolean');
};

export const validateOrder = order => {
    expectType(order.id, 'string');
    expectType(order.maker, 'string');
    expectType(order.marketAddr, 'string');
    expectType(order.orderId, 'string');
    expectType(order.rate, 'string');
    expectType(order.side, 'number');
    expectType(order.term, 'string');
    expectType(order.createdAtBlockNumber, 'string');
    expectType(order.createdAtTimestamp, 'string');
    expectType(order.amount, 'string');
    expectType(order.currencyName, 'string');
    expectType(order.orderState, 'string');
};

export const validateCollateralVaultPosition = collateralVaultPosition => {
    expectType(collateralVaultPosition.address0, 'string');
    expectType(collateralVaultPosition.address1, 'string');
    expectType(collateralVaultPosition.id, 'string');
    expectType(collateralVaultPosition.packedAddresses, 'string');
    expectType(collateralVaultPosition.lockedCollateral0, 'string');
    expectType(collateralVaultPosition.lockedCollateral1, 'string');
};

export const validateCollateralVault = collateralVault => {
    expectType(collateralVault.id, 'string');
    expectType(collateralVault.address, 'string');
    expectType(collateralVault.tokenAddress, 'string');
};

export const validateCollateralVaultBook = collateralBook => {
    expectType(collateralBook.id, 'string');
    expectType(collateralBook.address, 'string');
    expectType(collateralBook.independentCollateral, 'string');
    expectType(collateralBook.lockedCollateral, 'string');
};

export const validateCollateralBilateralPosition = bilateralPosition => {
    expectType(bilateralPosition.address0, 'string');
    expectType(bilateralPosition.address1, 'string');
    expectType(bilateralPosition.id, 'string');
};

export const validateCollateralNetting = netting => {
    expectType(netting.netPV, 'string');
    expectType(netting.unsettled0PV, 'string');
    expectType(netting.unsettled1PV, 'string');
    expectType(netting.party0PV, 'string');
    expectType(netting.party1PV, 'string');
};

export const validateCollateralAggregator = collateralAggregator => {
    expectType(collateralAggregator.id, 'string');
    expectType(collateralAggregator.address, 'string');
    expectType(collateralAggregator.autoLiquidation, 'string');
    expectType(collateralAggregator.liquidationPrice, 'string');
    expectType(collateralAggregator.marginCall, 'string');
    expectType(collateralAggregator.minCollateralRequirements, 'string');
};

export const validateLendingMarket = market => {
    expectType(market.id, 'string');
    expectType(market.marketRate, 'string');
    expectType(market.spread, 'string');
    expectType(market.term, 'string');
    expectType(market.totalLiquidity, 'string');
    expectType(market.totalLiquidityInUSD, 'string');
    expectType(market.totalAvailableLiquidity, 'string');
    expectType(market.totalAvailableLiquidityInUSD, 'string');
};

export const validateOrderbookRow = row => {
    expectType(row.rate, 'string');
    expectType(row.totalAmount, 'string');
    expectType(row.usdAmount, 'number');
};

export const validateTradingHistoryRow = row => {
    expectType(row.rate, 'string');
    expectType(row.side, 'string');
    expectType(row.createdAtTimestamp, 'string');
    expectType(row.amount, 'number');
};
