import {
    EarlyTermination,
    Liquidate,
    MarkToMarket,
    Novation,
    Register,
} from '../generated/LoanV2/LoanV2';
import { Loan } from '../generated/schema';
import { BIG_INT_BASIS_POINTS, EMPTY_STRING } from './constants';
import {
    getCouponFractionsFromTerm,
    getLoan,
    getLoanSchedule,
    getTimestampFromTerm,
} from './helpers/loan-helper';
import { getUser } from './user';

export function handleLoanRegister(event: Register): void {
    const loanId = event.params.dealId.toHexString();
    const loan = new Loan(loanId);
    loan.currencyName = event.params.ccy.toString();
    loan.currency = event.params.ccy;

    loan.term = event.params.term;
    loan.notional = event.params.notional;

    const lender = getUser(event.params.lender, event.block.timestamp);
    const borrower = getUser(event.params.borrower, event.block.timestamp);

    loan.lender = event.params.lender;
    const updatedLendInETH = lender.totalLendInETH.plus(loan.notional);
    lender.totalLendInETH = updatedLendInETH;
    loan.lenderUser = event.params.lender.toHex();

    loan.borrower = event.params.borrower;
    const updatedBorrowInETH = borrower.totalBorrowInETH.plus(loan.notional);
    borrower.totalBorrowInETH = updatedBorrowInETH;
    loan.borrowUser = event.params.borrower.toHex();

    lender.save();
    borrower.save();

    // calculate coupon payment:
    const couponFractions = getCouponFractionsFromTerm(loan.term);
    loan.rate = event.params.rate;
    loan.couponPayment = loan.notional
        .times(loan.rate)
        .times(couponFractions)
        .div(BIG_INT_BASIS_POINTS)
        .div(BIG_INT_BASIS_POINTS);

    loan.startTimestamp = event.block.timestamp;

    // calculate loan maturity
    const loanTime = getTimestampFromTerm(loan.term);
    loan.endTimestamp = event.block.timestamp.plus(loanTime);

    //construct loan schedule
    const schedule = getLoanSchedule(
        loanId,
        loan.term,
        loan.rate,
        loan.notional,
        loan.startTimestamp
    );
    schedule.save();

    loan.presentValue = event.params.notional;
    loan.currentTimestamp = event.block.timestamp;
    loan.isAvailable = true;
    loan.startTxHash = EMPTY_STRING;
    loan.state = 0;
    loan.save();
}

export function handleLoanEarlyTermination(event: EarlyTermination): void {
    const id = event.params.dealId.toHexString();
    const loan = getLoan(id);

    if (loan) {
        loan.isAvailable = false;
        loan.save();
    }
}

export function handleLoanMarkToMarket(event: MarkToMarket): void {
    const id = event.params.dealId.toHexString();
    const loan = getLoan(id);

    if (loan) {
        loan.presentValue = event.params.currPV;
        loan.currentTimestamp = event.block.timestamp;
        loan.save();
    }
}

export function handleLoanNovation(event: Novation): void {
    const id = event.params.dealId.toHexString();
    const loan = getLoan(id);

    if (loan) {
        loan.lender = event.params.currLender;
        loan.lenderUser = event.params.currLender.toHex();
        loan.save();
    }
}

export function handleLoanLiquidation(event: Liquidate): void {
    const id = event.params.dealId.toHexString();
    const loan = getLoan(id);

    if (loan) {
        loan.isAvailable = false;
        loan.save();
    }
}
