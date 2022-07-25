import { BigInt } from '@graphprotocol/graph-ts';
import { Loan, LoanSchedule, SchedulePayment } from '../../generated/schema';
import {
    BIG_INT_BASIS_POINTS,
    BIG_INT_NOTICE_PERIOD,
    BIG_INT_ONE_DAY_SECONDS,
    EMPTY_STRING,
} from '../constants';

export function getCouponFractionsFromTerm(term: BigInt): BigInt {
    if (term.lt(BigInt.fromI32(360))) {
        return BIG_INT_BASIS_POINTS.times(term).div(BigInt.fromI32(360));
    } else {
        return BIG_INT_BASIS_POINTS;
    }
}

export function getTimestampFromTerm(term: BigInt): BigInt {
    return term.times(BIG_INT_ONE_DAY_SECONDS);
}

export function getLoanSchedule(
    id: string,
    term: BigInt,
    rate: BigInt,
    amount: BigInt,
    startTime: BigInt
): LoanSchedule {
    let schedule = LoanSchedule.load(id);

    if (schedule === null) {
        schedule = constructSchedule(id, term, rate, amount, startTime);
    }

    return schedule as LoanSchedule;
}

export function getLoanPaymentFrequencyFromTerm(term: BigInt): BigInt {
    if (term.gt(BigInt.fromI32(365))) {
        return term.div(BigInt.fromI32(365));
    } else {
        return BigInt.fromI32(1);
    }
}

export function getLoanPaymentDeadlinesFromTerm(term: i32): BigInt[] {
    switch (term) {
        case 730:
            return [
                BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365 * 2).times(BIG_INT_ONE_DAY_SECONDS),
            ];
        case 1095:
            return [
                BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365 * 2).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365 * 3).times(BIG_INT_ONE_DAY_SECONDS),
            ];
        case 1825:
            return [
                BigInt.fromI32(365).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365 * 2).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365 * 3).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365 * 4).times(BIG_INT_ONE_DAY_SECONDS),
                BigInt.fromI32(365 * 5).times(BIG_INT_ONE_DAY_SECONDS),
            ];
        default:
            return [BigInt.fromI32(term).times(BIG_INT_ONE_DAY_SECONDS)];
    }
}

export function constructSchedule(
    id: string,
    term: BigInt,
    rate: BigInt,
    amount: BigInt,
    startTime: BigInt
): LoanSchedule {
    const frequency = getLoanPaymentFrequencyFromTerm(term);
    const deadlines = getLoanPaymentDeadlinesFromTerm(term.toI32());
    const couponFractions = getCouponFractionsFromTerm(term);

    let schedule = new LoanSchedule(id);
    schedule.loan = id;

    let couponPayment = amount
        .times(rate)
        .times(couponFractions)
        .div(BIG_INT_BASIS_POINTS)
        .div(BIG_INT_BASIS_POINTS);

    for (
        let i: BigInt = BigInt.fromI32(0);
        i.lt(frequency);
        i = i.plus(BigInt.fromI32(1))
    ) {
        let schedulePayment = new SchedulePayment(id + '-' + i.toString());
        schedulePayment.schedule = id;
        schedulePayment.notice = deadlines[i.toI32()].plus(
            startTime.minus(BIG_INT_NOTICE_PERIOD)
        );
        schedulePayment.payment = deadlines[i.toI32()].plus(startTime);
        schedulePayment.amount = couponPayment;
        schedulePayment.isDone = false;
        schedulePayment.txHash = EMPTY_STRING;

        if (i == frequency.minus(BigInt.fromI32(1))) {
            schedulePayment.amount = couponPayment.plus(amount);
        }

        schedulePayment.save();
    }

    return schedule as LoanSchedule;
}

export function getLoan(id: string): Loan {
    const loan = Loan.load(id);

    return loan as Loan;
}
