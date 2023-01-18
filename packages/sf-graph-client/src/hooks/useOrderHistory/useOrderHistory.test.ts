import { useQuery } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import { hexlify, randomBytes } from 'ethers/lib/utils';
import Module from 'module';
import { useOrderHistory } from './';

const mockUseQuery = useQuery as jest.Mock;

jest.mock('@apollo/client', () => ({
    ...(jest.requireActual('@apollo/client') as Module),
    useQuery: jest.fn(),
}));

const transactionsArray = [
    {
        currency: 'FIL',
        side: '0',
        maturity: '1733011200',
        rate: '200000',
        amount: '1000000000000000000000',
    },
];

describe('Order History', () => {
    describe('useOrderHistory hook test', () => {
        const account = hexlify(randomBytes(20));

        it('Should return array of buyers transactions', async () => {
            mockUseQuery.mockReturnValue({
                data: { orders: transactionsArray },
            });

            const { result } = renderHook(() => useOrderHistory({ account }));

            expect(result.current.error).toBeUndefined();
            expect(result.current.data?.orders).toEqual(transactionsArray);
        });
    });
});
