import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import { useTermInfo, useTerms } from '../../src/hooks';
import {
    term,
    validateCurrency,
    validateProduct,
    validateTerm,
} from '../utils';

describe('useTermInfo hook test', () => {
    it('Should return null from subgraph for term with 0 number of days', async () => {
        const { result } = renderHook(() => useTermInfo(0));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data).to.be.undefined;
    });

    it('Should get information for 90 days term from subgraph', async () => {
        const { result } = renderHook(() => useTermInfo(term));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.term !== undefined) {
            const term = result.current.data.term;

            validateTerm(term);

            const products = term.products;

            for (let i = 0; i < products.length; i++) {
                validateProduct(products[i]);
            }

            const currencies = term.currencies;

            for (let i = 0; i < currencies.length; i++) {
                validateCurrency(currencies[i]);
            }
        }
    });
});

describe('useTerms hook test', () => {
    it('Should get all terms from subgraph and validate types', async () => {
        const { result } = renderHook(() => useTerms());

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.terms !== undefined) {
            const terms = result.current.data.terms;

            for (let i = 0; i < terms.length; i++) {
                validateTerm(terms[i]);
            }
        }
    });
});
