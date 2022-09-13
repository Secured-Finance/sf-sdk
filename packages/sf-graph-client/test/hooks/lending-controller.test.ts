import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import { utils } from 'ethers';
import {
    GraphApolloClient,
    useBuyerTransactionHistory,
    useSellerTransactionHistory,
} from '../../src';

describe('Lending Controller test', () => {
    let client: GraphApolloClient;

    before(() => {
        process.env.SUBGRAPH_NAME = 'sf-protocol-dev';
        process.env.SF_ENV = 'development';
        client = new GraphApolloClient({ network: 'rinkeby' });
    });

    describe('useBuyerTransactionHistory hook test', () => {
        const account = utils.hexlify(utils.randomBytes(20));

        it('Should return empty buyer transactions', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useBuyerTransactionHistory({ account }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            if (result.current.data?.transactionTables !== undefined) {
                expect(result.current.data?.transactionTables).to.be.empty;
            }
        });
    });

    describe('useSellerTransactionHistory hook test', () => {
        const account = utils.hexlify(utils.randomBytes(20));

        it('Should return empty seller transactions', async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useSellerTransactionHistory({ account }, client)
            );

            await waitForNextUpdate();

            expect(result.current.error).to.be.undefined;

            if (result.current.data?.transactionTables !== undefined) {
                expect(result.current.data?.transactionTables).to.be.empty;
            }
        });
    });
});
