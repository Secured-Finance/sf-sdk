import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    useBilateralPositionFromVault,
    useBilateralPositionsFromVault,
    useCollateralBookFromVault,
    useCollateralVault,
    useCollateralVaults,
} from '../../src/hooks';
import {
    counterparty,
    user,
    validateCollateralVault,
    validateCollateralVaultBook,
    validateCollateralVaultPosition,
    validateCurrency,
    vault,
    vaultCcy,
} from '../utils';

describe('useCollateralVault hook test', () => {
    it('Should return undefined if vault address is empty', async () => {
        const { result } = renderHook(() => useCollateralVault(''));

        expect(result.current.data).to.be.undefined;
    });

    it('Should get collateral vault data from subgraph', async () => {
        const { result } = renderHook(() => useCollateralVault(vault));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.collateralVault != undefined) {
            const collateralVault = result.current.data.collateralVault;

            validateCollateralVault(collateralVault);
            validateCurrency(collateralVault.currency);

            const positions = collateralVault.collateralPositions;
            const books = collateralVault.collateralBooks;

            for (let j = 0; j < positions.length; j++) {
                validateCollateralVaultPosition(positions[j]);
            }

            for (let l = 0; l < books.length; l++) {
                validateCollateralVaultBook(books[l]);
            }
        }
    });
});

describe('useCollateralVaults hook test', () => {
    it('Should get all collateral vaults from subgraph', async () => {
        const { result } = renderHook(() => useCollateralVaults());

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.collateralVaults != undefined) {
            const collateralVaults = result.current.data.collateralVaults;

            for (let i = 0; i < collateralVaults.length; i++) {
                validateCollateralVault(collateralVaults[i]);
                validateCurrency(collateralVaults[i].currency);

                const positions = collateralVaults[i].collateralPositions;
                const books = collateralVaults[i].collateralBooks;

                for (let j = 0; j < positions.length; j++) {
                    validateCollateralVaultPosition(positions[j]);
                }

                for (let l = 0; l < books.length; l++) {
                    validateCollateralVaultBook(books[l]);
                }
            }
        }
    });
});

describe('useCollateralBookFromVault hook test', () => {
    it('Should get collateral book from a vault for a specific user', async () => {
        const { result } = renderHook(() =>
            useCollateralBookFromVault(vault, user)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.collateralBooks != undefined) {
            const collateralBooks = result.current.data.collateralBooks;

            for (let i = 0; i < collateralBooks.length; i++) {
                validateCollateralVaultBook(collateralBooks[i]);
                validateCollateralVault(collateralBooks[i].vault);
                validateCurrency(collateralBooks[i].currency);
            }
        }
    });

    it("Should return undefined if user's address is empty", async () => {
        const { result } = renderHook(() =>
            useCollateralBookFromVault(vault, '')
        );

        expect(result.current.data).to.be.undefined;
    });
});

describe('useBilateralPositionsFromVault hook test', () => {
    it("Should return error if user's address is empty", async () => {
        const { result } = renderHook(() =>
            useBilateralPositionsFromVault(vault, '')
        );

        expect(result.current.data).to.be.undefined;
    });

    it("Should get data for user's existing collateral vault positions from subgraph", async () => {
        const { result } = renderHook(() =>
            useBilateralPositionsFromVault(vault, user)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.collateralVaultPositions != undefined) {
            const collateralVaultPositions =
                result.current.data.collateralVaultPositions;

            for (let i = 0; i < collateralVaultPositions.length; i++) {
                validateCollateralVaultPosition(collateralVaultPositions[i]);
                validateCollateralVault(collateralVaultPositions[i].vault);
                validateCurrency(collateralVaultPositions[i].currency);
            }
        }
    });
});

describe('useBilateralPositionFromVault hook test', () => {
    it("Should return error if user's address is empty", async () => {
        const { result } = renderHook(() =>
            useBilateralPositionFromVault(vault, '', counterparty, vaultCcy)
        );

        expect(result.error.message).to.contain('invalid address');
    });

    it("Should return error if counterparty's address is empty", async () => {
        const { result } = renderHook(() =>
            useBilateralPositionFromVault(vault, user, '', vaultCcy)
        );

        expect(result.error.message).to.contain('invalid address');
    });

    it('Should return undefined if currency is empty', async () => {
        const { result } = renderHook(() =>
            useBilateralPositionFromVault(vault, user, counterparty, '')
        );

        expect(result.current.data).to.be.undefined;
    });

    it("Should get data for user's existing collateral vault positions from subgraph", async () => {
        const { result } = renderHook(() =>
            useBilateralPositionFromVault(vault, user, counterparty, vaultCcy)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.collateralVaultPosition != undefined) {
            const collateralVaultPosition =
                result.current.data.collateralVaultPosition;
            validateCollateralVaultPosition(collateralVaultPosition);
            validateCollateralVault(collateralVaultPosition.vault);
            validateCurrency(collateralVaultPosition.currency);
        }
    });
});
