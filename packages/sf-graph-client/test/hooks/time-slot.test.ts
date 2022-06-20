import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import { useTimeSlotInfo, useTimeSlots } from '../../src/hooks';
import {
    ccy,
    counterparty,
    day,
    month,
    user,
    validateCurrency,
    validateTimeSlot,
    year,
} from '../utils';

describe('useTimeSlotInfo hook test', () => {
    it('Should get time slot information from subgraph and validate the state', async () => {
        const { result } = renderHook(() =>
            useTimeSlotInfo(user, counterparty, ccy, year, month, day)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.timeSlot !== undefined) {
            const timeSlot = result.current.data.timeSlot;

            validateTimeSlot(timeSlot);
            validateCurrency(timeSlot.currency);
        }
    });

    it('Should get empty time slot result from subgraph for empty counterparty address', async () => {
        const { result } = renderHook(() =>
            useTimeSlotInfo(user, '', ccy, year, month, day)
        );

        expect(result.error?.message).to.contain('invalid address');
    });

    it('Should return undefined result from subgraph for empty ccy', async () => {
        const { result } = renderHook(() =>
            useTimeSlotInfo(user, counterparty, '', year, month, day)
        );
        expect(result.current.data).to.be.undefined;
    });

    it('Should return undefined result from subgraph for empty year', async () => {
        const { result } = renderHook(() =>
            useTimeSlotInfo(user, counterparty, ccy, 0, month, day)
        );
        expect(result.current.data).to.be.undefined;
    });

    it('Should return undefined result from subgraph for empty month', async () => {
        const { result } = renderHook(() =>
            useTimeSlotInfo(user, counterparty, ccy, year, 0, day)
        );
        expect(result.current.data).to.be.undefined;
    });

    it('Should return undefined result from subgraph for empty day', async () => {
        const { result } = renderHook(() =>
            useTimeSlotInfo(user, counterparty, ccy, year, month, 0)
        );
        expect(result.current.data).to.be.undefined;
    });
});

describe('useTimeSlots hook test', () => {
    it('Should get all time slots from subgraph for a specific user and validate types', async () => {
        const user = '0xef157d80553023b5efeebaeec9694ed17f1fcb20';
        const { result } = renderHook(() => useTimeSlots(user));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.timeSlots !== undefined) {
            const timeSlots = result.current.data.timeSlots;

            for (let i = 0; i < timeSlots.length; i++) {
                validateTimeSlot(timeSlots[i]);
                validateCurrency(timeSlots[i].currency);
            }
        }
    });

    it('Should return all time slots from subgraph for empty address', async () => {
        const user = '';
        const { result } = renderHook(() => useTimeSlots(user));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.timeSlots !== undefined) {
            expect(result.current.data?.timeSlots).to.not.be.empty;
        }
    });
});
