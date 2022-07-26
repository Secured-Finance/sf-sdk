import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import { assert, test } from 'matchstick-as/assembly/index';

import {
    handleLoanEarlyTermination,
    handleLoanLiquidation,
    handleLoanMarkToMarket,
    handleLoanNovation,
    handleLoanRegister,
} from '../src/loan';
import {
    createLiquidateLoanEvent,
    createLoanMarkToMarketEvent,
    createLoanNovationEvent,
    createRegisterLoanEvent,
} from './mocks/loan';
import { toBytes32 } from './utils/string';
export {
    handleLoanEarlyTermination,
    handleLoanLiquidation,
    handleLoanMarkToMarket,
    handleLoanNovation,
    handleLoanRegister,
};

const user = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');
const counterparty = Address.fromString(
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
);
const currencyShortName = 'ETH';
const currencyIdentifier = toBytes32(currencyShortName);
const termDays = BigInt.fromI32(730);
const notional = BigInt.fromI32(100000);
const rate = BigInt.fromI32(700);
const dealId = Bytes.fromHexString(
    '0x21aaa47b00000000000000000000000000000000000000000000000000000001'
);
const coupon = notional.times(rate).div(BigInt.fromI32(10000));

test('Should register new loan and validate the state', () => {
    let event = createRegisterLoanEvent(
        user,
        counterparty,
        currencyIdentifier,
        termDays,
        notional,
        rate,
        dealId
    );
    handleLoanRegister(event);

    assert.fieldEquals('Loan', dealId.toHexString(), 'lender', user.toHex());

    assert.fieldEquals(
        'Loan',
        dealId.toHexString(),
        'borrower',
        counterparty.toHex()
    );

    assert.fieldEquals(
        'Loan',
        dealId.toHexString(),
        'notional',
        notional.toString()
    );

    assert.fieldEquals(
        'Loan',
        dealId.toHexString(),
        'presentValue',
        notional.toString()
    );

    assert.fieldEquals(
        'SchedulePayment',
        dealId.toHexString() + '-' + '0', // first payment
        'amount',
        coupon.toString()
    );

    assert.fieldEquals(
        'SchedulePayment',
        dealId.toHexString() + '-' + '1', // redemption payment
        'amount',
        notional.plus(coupon).toString()
    );
});

test('Should create mark to market event and validate present value change', () => {
    const newPV = BigInt.fromI32(99500);

    let event = createLoanMarkToMarketEvent(dealId, notional, newPV);
    handleLoanMarkToMarket(event);

    assert.fieldEquals(
        'Loan',
        dealId.toHexString(),
        'presentValue',
        newPV.toString()
    );
});

test('Should perform novation for the existing loan, and validate the state', () => {
    const secondCounterparty = counterparty;

    let event = createLoanNovationEvent(dealId, counterparty);
    handleLoanNovation(event);

    assert.fieldEquals(
        'Loan',
        dealId.toHex(),
        'lender',
        secondCounterparty.toHex()
    );
});

test('Should perform loan liquidation and validate the state', () => {
    let event = createLiquidateLoanEvent(dealId);
    handleLoanLiquidation(event);

    assert.fieldEquals('Loan', dealId.toHex(), 'isAvailable', 'false');
});
