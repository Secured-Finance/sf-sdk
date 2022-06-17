import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    useBilateralPosition,
    useCollateralAggregator,
    useUnsettledPositions,
} from '../../src/hooks';
import {
    expectType,
    user,
    validateCollateralAggregator,
    validateCollateralBilateralPosition,
    validateCollateralNetting,
    validateCurrency,
} from '../utils';

describe('useBilateralPosition hook test', () => {
    it("Should return all bilateral positions if user's address is empty", async () => {
        const { result } = renderHook(() => useBilateralPosition(''));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data?.bilateralPositions).to.not.be.empty;
    });

    it("Should get data for user's existing BilateralPositions from subgraph", async () => {
        const { result } = renderHook(() => useBilateralPosition(user));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.bilateralPositions != undefined) {
            const bilateralPositions = result.current.data.bilateralPositions;

            for (let i = 0; i < bilateralPositions.length; i++) {
                validateCollateralBilateralPosition(bilateralPositions[i]);

                const collateralNettings =
                    bilateralPositions[i].collateralNettings;

                for (let j = 0; j < collateralNettings.length; j++) {
                    validateCollateralNetting(collateralNettings[j]);
                    validateCurrency(collateralNettings[j].currency);
                }
            }
        }
    });
});

describe('useCollateralAggregator hook test', () => {
    it('Should get data for CollateralAggregator from subgraph', async () => {
        const { result } = renderHook(() => useCollateralAggregator());

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data != undefined) {
            const collateralAggregator = result.current.data;
            validateCollateralAggregator(collateralAggregator);
        }
    });
});

describe('useUnsettledPositions hook test', () => {
    const user = '0x57ab42d4fa756b6956b0caf986a5f53ba90d9e28';

    it("Should return all bilateral positions if user's address is empty", async () => {
        const { result } = renderHook(() => useUnsettledPositions(''));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data?.collateralPositions).to.be.empty;
    });

    it("Should get data for user's existing BilateralPositions from subgraph", async () => {
        const { result } = renderHook(() => useUnsettledPositions(user));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.collateralPositions != undefined) {
            const data = result.current.data.collateralPositions[0];
            expectType(data.address, 'string');

            const collateralPositions = data.collateralPositions[0];
            expectType(collateralPositions.unsettledPV, 'string');
            expectType(collateralPositions.currencyIdentifier, 'string');

            validateCurrency(collateralPositions.currency);
        }
    });
});
