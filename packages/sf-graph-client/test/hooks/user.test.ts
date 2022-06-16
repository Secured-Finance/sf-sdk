import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    useOpenLoans,
    useOpenOrders,
    useUsersTradingHistoryQuery,
} from '../../src/hooks';
import {
    ccy,
    term,
    user,
    validateCurrency,
    validateLoan,
    validateOrder,
} from '../utils';

describe('useOpenLoans hook test', () => {
    it('Should get all open loans for a user from a subgraph', async () => {
        const { result } = renderHook(() => useOpenLoans(user, ccy, term));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.user.loans != undefined) {
            const loans = result.current.data.user.loans;

            for (let i = 0; i < loans.length; i++) {
                validateLoan(loans[i]);
                validateCurrency(loans[i].currency);
            }
        }
    });

    it('Should return empty open loans array on empty term from a subgraph', async () => {
        const { result } = renderHook(() => useOpenLoans(user, '', term));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data.user.loans).to.be.empty;
    });

    it('Should return empty open loans array on empty term from a subgraph', async () => {
        const { result } = renderHook(() => useOpenLoans(user, ccy, 0));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data.user.loans).to.be.empty;
    });
});

describe('useOpenOrders hook test', () => {
    const user = '0xf5afe18ce2556c8709753883d9ba77b02e37400f';
    const market = '0x412e5fd69305a0b5dfe949fbfe2464958f6bcfe3';

    it('Should get all open orders for a user from a subgraph', async () => {
        const { result } = renderHook(() => useOpenOrders(user, market));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.user.openOrders != undefined) {
            const orders = result.current.data.user.openOrders;

            for (let i = 0; i < orders.length; i++) {
                validateOrder(orders[i]);
                validateCurrency(orders[i].currency);
            }
        }
    });

    it('Should return empty open orders array on empty market from a subgraph', async () => {
        const { result } = renderHook(() => useOpenOrders(user, ''));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data.user.openOrders).to.be.empty;
    });
});

describe('useUsersTradingHistory hook test', () => {
    const user = '0xf5afe18ce2556c8709753883d9ba77b02e37400f';
    const market = '0x412e5fd69305a0b5dfe949fbfe2464958f6bcfe3';

    it('Should get all orders for a user from a subgraph', async () => {
        const { result } = renderHook(() =>
            useUsersTradingHistoryQuery(user, market)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data != undefined) {
            const orders = result.current.data;

            for (let i = 0; i < orders.length; i++) {
                validateOrder(orders[i]);
                validateCurrency(orders[i].currency);
            }
        }
    });

    it('Should return empty trading history array on empty market from a subgraph', async () => {
        const { result } = renderHook(() =>
            useUsersTradingHistoryQuery(user, '')
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data).to.be.empty;
    });
});
