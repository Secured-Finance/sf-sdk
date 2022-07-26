import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import { utils } from 'ethers';
import {
    GraphApolloClient,
    useBorrowingDeals,
    useLendingDeals,
    useLoanInfo,
} from '../../src';

describe('Loans test', () => {
    let client: GraphApolloClient;

    before(() => {
        process.env.SUBGRAPH_NAME = 'sf-protocol-dev';
        process.env.SF_ENV = 'development';
        client = new GraphApolloClient({ network: 'rinkeby' });
    });

    describe('useBorrowingDeals hook test', () => {
        const account = utils.hexlify(utils.randomBytes(20));

        it('Should return empty borrowing deals', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useBorrowingDeals({ account }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            if (result.current.data?.loans !== undefined) {
                expect(result.current.data?.loans).to.be.empty;
            }
        });
    });

    describe('useLendingDeals hook test', () => {
        const account = utils.hexlify(utils.randomBytes(20));

        it('Should return empty lend deals', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLendingDeals({ account }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            if (result.current.data?.loans !== undefined) {
                expect(result.current.data?.loans).to.be.empty;
            }
        });
    });

    describe('useLoanInfo hook test', () => {
        const id = 'MockID';
        it('Should return undefined', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useLoanInfo({ id }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;
            expect(result.current.data?.loan).to.be.undefined;
        });
    });
});
