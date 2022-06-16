import { renderHook } from '@testing-library/react-hooks';
import { useCurrencies, useCurrencyInfo } from '../../src/hooks';
import { validateCurrency, validateTerm } from '../utils';

describe('useCurrencies hook test', () => {
    it('Should get data existing currencies from subgraph', async () => {
        const { result } = renderHook(() => useCurrencies());

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.currencies != undefined) {
            const currencies = result.current.data.currencies;

            for (let i = 0; i < currencies.length; i++) {
                validateCurrency(currencies[i]);
            }
        }
    });
});

describe('useCurrencyInfo hook test', () => {
    it('Should get currency information from subgraph', async () => {
        const { result } = renderHook(() => useCurrencyInfo('FIL'));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.currency != undefined) {
            const currency = result.current.data.currency;
            validateCurrency(currency);

            const terms = currency.terms;

            for (let i = 0; i < terms.length; i++) {
                validateTerm(terms[i]);
            }
        }
    });
});
