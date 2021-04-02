import { BigDecimal, BigInt, ByteArray, Bytes, ethereum, log } from '@graphprotocol/graph-ts'
import { Loan as LoanContract, MakeLoanDeal, NotifyPayment, ConfirmPayment, UpdateState } from '../generated/Loan/Loan'
import { Loan, LoanSchedule, SchedulePayment, User } from '../generated/schema'
import { BIG_DECIMAL_BASIS_POINTS, BIG_INT_BASIS_POINTS, BIG_INT_NOTICE_PERIOD, BIG_INT_ONE, BIG_INT_ONE_YEAR_SECONDS, BIG_INT_PERCENT_BASE, BIG_INT_ZERO, EMPTY_STRING } from './constants'
import { getCouponFractionsFromTerm, getCurrency, getLoanPaymentDeadlinesFromTerm, getLoanPaymentFrequencyFromTerm, getTerm, getTimestampFromTerm } from './helpers'
import { getUser } from './user'

function getLoanSchedule(id: string, term: i32, rate: BigInt, amount: BigInt, startTime: BigInt): LoanSchedule {
    let schedule = LoanSchedule.load(id)
  
    if (schedule === null) {
        schedule = constructSchedule(id, term, rate, amount, startTime)
    }
  
    return schedule as LoanSchedule
}

function constructSchedule(id: string, term: i32, rate: BigInt, amount: BigInt, startTime: BigInt): LoanSchedule {
    const frequency = getLoanPaymentFrequencyFromTerm(term)
    const deadlines = getLoanPaymentDeadlinesFromTerm(term)
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

export function handleMakeLoanDeal(event: MakeLoanDeal): void {
    let loan = new Loan(event.params.loanId.toString())
    loan.side = event.params.side
    loan.currency = event.params.ccy

    loan.term = event.params.term
    loan.amount = event.params.amt

    const lender = getUser(event.params.lender, event.block.timestamp)
    const borrower = getUser(event.params.borrower, event.block.timestamp)

    loan.lender = event.params.lender
    let updatedLendInETH = lender.totalLendInETH.plus(loan.amount)
    lender.totalLendInETH = updatedLendInETH
    loan.lenderUser = event.params.lender.toHex()

    loan.borrower = event.params.borrower
    let updatedBorrowInETH = borrower.totalBorrowInETH.plus(loan.amount)
    borrower.totalBorrowInETH = updatedBorrowInETH
    loan.borrowUser = event.params.borrower.toHex()

    lender.save()
    borrower.save()
    // if (loan.side == 1) {
    //     const lender = getUser(event.transaction.from, event.block.timestamp)
    //     const borrower = getUser(event.params.makerAddr, event.block.timestamp)

    //     let updatedLendInETH = lender.totalLendInETH.plus(loan.amount)
    //     lender.totalLendInETH = updatedLendInETH

    //     loan.lender = event.transaction.from
    //     loan.lenderUser = event.transaction.from.toHex()

    //     let updatedBorrowInETH = borrower.totalBorrowInETH.plus(loan.amount)
    //     borrower.totalBorrowInETH = updatedBorrowInETH

    //     loan.borrower = event.params.makerAddr
    //     loan.borrowUser = event.params.makerAddr.toHex()

    //     lender.save()
    //     borrower.save()
    // }

    // calculate coupon payment:
    const couponFractions = getCouponFractionsFromTerm(loan.term)
    loan.rate = event.params.rate
    loan.couponPayment = loan.amount.times(loan.rate).times(couponFractions).div(BIG_INT_BASIS_POINTS).div(BIG_INT_BASIS_POINTS)

    loan.startTimestamp = event.block.timestamp

    // calculate loan maturity
    const loanTime = getTimestampFromTerm(loan.term)
    loan.endTimestamp = event.block.timestamp.plus(loanTime)

    //construct loan schedule
    const schedule = getLoanSchedule(event.params.loanId.toString(), loan.term, loan.rate, loan.amount, loan.startTimestamp)
    schedule.save()

    loan.presentValue = event.params.amt
    loan.currentTimestamp = event.block.timestamp
    loan.isAvailable = true
    loan.startTxHash = EMPTY_STRING
    loan.state = 0
    loan.save()
}

export function handleUpdateLoanState(event: UpdateState): void {
    let loan = Loan.load(event.params.loanId.toString())
    if (loan == null) {
      loan = new Loan(event.params.loanId.toString())
    }

    if (loan.state == event.params.prevState) {
        loan.state = event.params.currState
        loan.currentTimestamp = event.block.timestamp
    }

    loan.save()
}

export function handleNotifyLoanPayment(event: NotifyPayment): void {
    let loan = Loan.load(event.params.loanId.toString())
    if (loan == null) {
      loan = new Loan(event.params.loanId.toString())
    }

    loan.currentTimestamp = event.block.timestamp

    if (loan.state == 0) {
        loan.startTxHash = event.params.txHash
    } else if (loan.state == 2) {
        const schedule = getLoanSchedule(event.params.loanId.toString(), loan.term, loan.rate, loan.amount, loan.startTimestamp)
        const frequency = getLoanPaymentFrequencyFromTerm(loan.term)

        let i :BigInt = BIG_INT_ZERO
        let schedulePayment = SchedulePayment.load(event.params.loanId.toString() + "-" + i.toString())

        for (i; i.lt(frequency); i = i.plus(BIG_INT_ONE)) {
            schedulePayment = SchedulePayment.load(event.params.loanId.toString() + "-" + i.toString())
            if (schedulePayment.isDone == false) break;
        }
        schedulePayment.txHash = event.params.txHash
        schedulePayment.save()

        schedule.save()
    }

    loan.save()
}

export function handleConfirmLoanPayment(event: ConfirmPayment): void {
    let loan = Loan.load(event.params.loanId.toString())
    if (loan == null) {
      loan = new Loan(event.params.loanId.toString())
    }

    if (loan.state == 0 && loan.startTxHash == event.params.txHash && loan.amount == event.params.amt) {
        loan.state = 1
    } else if (loan.state == 2) {
        const schedule = getLoanSchedule(event.params.loanId.toString(), loan.term, loan.rate, loan.amount, loan.startTimestamp)
        const frequency = getLoanPaymentFrequencyFromTerm(loan.term)

        let i :BigInt = BIG_INT_ZERO
        let schedulePayment = SchedulePayment.load(event.params.loanId.toString() + "-" + i.toString())

        for (i; i.lt(frequency); i = i.plus(BIG_INT_ONE)) {
            schedulePayment = SchedulePayment.load(event.params.loanId.toString() + "-" + i.toString())
            if (schedulePayment.isDone == false) {
                if (schedulePayment.txHash == event.params.txHash) {
                    schedulePayment.isDone = true
                    schedulePayment.save()
                }
                break;
            }
        }

        schedule.save()

        if (i == frequency.minus(BIG_INT_ONE)) {
            loan.state = 4
        } else {
            loan.state = 1
        }
    }

    loan.save()

}