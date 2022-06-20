import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    useCloseOutNetting,
    useCloseOutNettings,
} from '../../src/hooks/close-out';
import {
    ccy,
    counterparty,
    user,
    validateCloseOutNetting,
    validateCurrency,
} from '../utils';

describe('useCloseOutNetting hook test', () => {
    it('Should throw an error on empty address', () => {
        const { result } = renderHook(() =>
            useCloseOutNetting('', counterparty, ccy)
        );
        expect(result.error?.message).to.contain('invalid address');
    });

    it('Should throw an error on empty counterparty address', async () => {
        const { result } = renderHook(() => useCloseOutNetting(user, '', ccy));

        expect(result.error?.message).to.contain('invalid address');
    });

    it('Should return undefined on empty currency identifier', async () => {
        const { result } = renderHook(() =>
            useCloseOutNetting(user, counterparty, '')
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data?.closeOutNetting).to.be.undefined;
    });

    it('Should get data for existing CloseOutNetting from subgraph', async () => {
        const { result } = renderHook(() =>
            useCloseOutNetting(user, counterparty, ccy)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.closeOutNetting !== undefined) {
            validateCloseOutNetting(result.current.data.closeOutNetting);
            validateCurrency(result.current.data?.closeOutNetting?.currency);
        }
    });
});

describe('useCloseOutNettings hook test', () => {
    it('Should return empty array if one of addresses is not present', async () => {
        const { result } = renderHook(() =>
            useCloseOutNettings('', counterparty)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.closeOutNettings !== undefined) {
            expect(result.current.data?.closeOutNettings).to.be.empty;
        }
    });

    it('Should get data for existing CloseOutNettings between counterparties from subgraph', async () => {
        const { result } = renderHook(() =>
            useCloseOutNettings(user, counterparty)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.closeOutNettings !== undefined) {
            const closeOutNettings = result.current.data.closeOutNettings;

            for (let i = 0; i < closeOutNettings.length; i++) {
                validateCloseOutNetting(closeOutNettings[i]);
                validateCurrency(closeOutNettings[i].currency);
            }
        }
    });
});
