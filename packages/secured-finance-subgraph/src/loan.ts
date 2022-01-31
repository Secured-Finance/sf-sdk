import { BigDecimal, BigInt, ByteArray, Bytes, ethereum, log } from '@graphprotocol/graph-ts'
import { LoanV2 as LoanContract, Register, Liquidate, RequestTermination, EarlyTermination, RejectTermination, MarkToMarket, Novation } from '../generated/LoanV2/LoanV2'
import { Loan, LoanNovation, LoanSchedule, LoanTermination, SchedulePayment, User } from '../generated/schema'
import { ADDRESS_ZERO, BIG_INT_BASIS_POINTS, BIG_INT_NOTICE_PERIOD, BIG_INT_ONE, BIG_INT_ZERO, EMPTY_STRING, EMPTY_TX_HASH } from './constants'
import { getCouponFractionsFromTerm, getLoanPaymentDeadlinesFromTerm, getLoanPaymentFrequencyFromTerm, getTerm, getTimestampFromTerm } from './helpers'
import { getUser } from './user'

export function getLoan(id: string): Loan {
    let loan = Loan.load(id)

    return loan as Loan
}

export function getLoanTermination(id: string): LoanTermination {
    let termination = LoanTermination.load(id)

    if (!termination) {
        termination = new LoanTermination(id)
    }

    return termination as LoanTermination
}

function getLoanSchedule(id: string, term: BigInt, rate: BigInt, amount: BigInt, startTime: BigInt): LoanSchedule {
    let schedule = LoanSchedule.load(id)
  
    if (schedule === null) {
        schedule = constructSchedule(id, term, rate, amount, startTime)
    }

    return schedule as LoanSchedule
}

function constructSchedule(id: string, term: BigInt, rate: BigInt, amount: BigInt, startTime: BigInt): LoanSchedule {
    const frequency = getLoanPaymentFrequencyFromTerm(term)
    const deadlines = getLoanPaymentDeadlinesFromTerm(term.toI32())
    const couponFractions = getCouponFractionsFromTerm(term)

    let schedule = new LoanSchedule(id)
    schedule.loan = id

    let couponPayment = amount.times(rate).times(couponFractions).div(BIG_INT_BASIS_POINTS).div(BIG_INT_BASIS_POINTS)

    for (let i :BigInt = BIG_INT_ZERO ; i.lt(frequency); i = i.plus(BIG_INT_ONE)) {
        let schedulePayment = new SchedulePayment(id + "-" + i.toString())
        schedulePayment.schedule = id
        schedulePayment.notice = deadlines[i.toI32()].plus(startTime.minus(BIG_INT_NOTICE_PERIOD))
        schedulePayment.payment = deadlines[i.toI32()].plus(startTime)
        schedulePayment.amount = couponPayment
        schedulePayment.isDone = false
        schedulePayment.txHash = EMPTY_STRING

        if (i == frequency.minus(BIG_INT_ONE)) {
            schedulePayment.amount = couponPayment.plus(amount)
        }

        schedulePayment.save()
    }

    return schedule as LoanSchedule
}

export function handleLoanRegister(event: Register): void {
    let loanId = event.params.dealId.toHexString()
    let loan = new Loan(loanId)
    loan.currency = event.params.ccy

    loan.term = event.params.term
    loan.notional = event.params.notional

    const lender = getUser(event.params.lender, event.block.timestamp)
    const borrower = getUser(event.params.borrower, event.block.timestamp)

    loan.lender = event.params.lender
    let updatedLendInETH = lender.totalLendInETH.plus(loan.notional)
    lender.totalLendInETH = updatedLendInETH
    loan.lenderUser = event.params.lender.toHex()

    loan.borrower = event.params.borrower
    let updatedBorrowInETH = borrower.totalBorrowInETH.plus(loan.notional)
    borrower.totalBorrowInETH = updatedBorrowInETH
    loan.borrowUser = event.params.borrower.toHex()

    lender.save()
    borrower.save()

    // calculate coupon payment:
    const couponFractions = getCouponFractionsFromTerm(loan.term)
    loan.rate = event.params.rate
    loan.couponPayment = loan.notional.times(loan.rate).times(couponFractions).div(BIG_INT_BASIS_POINTS).div(BIG_INT_BASIS_POINTS)

    loan.startTimestamp = event.block.timestamp

    // calculate loan maturity
    const loanTime = getTimestampFromTerm(loan.term)
    loan.endTimestamp = event.block.timestamp.plus(loanTime)

    //construct loan schedule
    const schedule = getLoanSchedule(loanId, loan.term, loan.rate, loan.notional, loan.startTimestamp)
    schedule.save()

    loan.presentValue = event.params.notional
    loan.currentTimestamp = event.block.timestamp
    loan.isAvailable = true
    loan.startTxHash = EMPTY_STRING
    loan.state = 0
    loan.save()
}

export function handleLoanTerminationRequest(event: RequestTermination): void {
    let id = event.params.dealId.toHexString()
    let loan = getLoan(id)

    if (loan) {
        let termination = getLoanTermination(id)

        log.info('handleLoanTerminationRequest {} {}', [
            id,
            event.params.requestedBy.toHexString(),
            BIG_INT_ZERO.toHexString()
        ]);

        termination.loan = id
        termination.terminationAsker = event.params.requestedBy
        termination.terminationSubmitter = ADDRESS_ZERO
        termination.terminationDate = BIG_INT_ZERO
        termination.repayment = BIG_INT_ZERO

        termination.save()
    }
}

export function handleLoanTerminationRejection(event: RejectTermination): void {
    let id = event.params.dealId.toHexString()
    let loan = getLoan(id)

    if (loan) {
        let termination = getLoanTermination(id)

        log.info('handleLoanTerminationRejection {} {}', [
            ADDRESS_ZERO.toHexString(),
            BIG_INT_ZERO.toHexString(),
            EMPTY_TX_HASH.toHexString(),
        ]);

        termination.terminationAsker = ADDRESS_ZERO
        termination.terminationSubmitter = ADDRESS_ZERO
        termination.terminationDate = BIG_INT_ZERO
        termination.repayment = BIG_INT_ZERO

        termination.save()
    }
}

export function handleLoanEarlyTermination(event: EarlyTermination): void {
    let id = event.params.dealId.toHexString()
    let loan = getLoan(id)

    if (loan) {
        let termination = getLoanTermination(id)

        log.info('handleLoanEarlyTermination {} {} {}', [
            event.params.acceptedBy.toHexString(),
            event.params.dealId.toHexString(),
            event.params.payment.toString(),
        ]);

        termination.terminationSubmitter = event.params.acceptedBy
        termination.repayment = event.params.payment
        termination.terminationDate = event.block.timestamp
        termination.save()

        loan.isAvailable = false
        loan.save()
    }
}

export function handleLoanMarkToMarket(event: MarkToMarket): void {
    let id = event.params.dealId.toHexString()
    let loan = getLoan(id)

    if (loan) {
        loan.presentValue = event.params.currPV
        loan.currentTimestamp = event.block.timestamp
        loan.save()
    }
}

export function handleLoanNovation(event: Novation): void {
    let id = event.params.dealId.toHexString()
    let loan = getLoan(id)

    if (loan) {
        let novationId = id + "-" + event.block.timestamp.toHexString();
        let novation = new LoanNovation(novationId)

        novation.previousLender = loan.lender
        novation.newLender = event.params.currLender
        novation.novationDate = event.block.timestamp
        novation.loan = id

        novation.save()

        loan.lender = event.params.currLender
        loan.lenderUser = event.params.currLender.toHex()
        loan.save()
    }

}

export function handleLoanLiquidation(event: Liquidate): void {
    let id = event.params.dealId.toHexString()
    let loan = getLoan(id)

    if (loan) {
        loan.isAvailable = false
        loan.save()
    }
}