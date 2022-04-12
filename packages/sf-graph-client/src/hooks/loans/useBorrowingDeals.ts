import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { BORROW_DEALS } from '../../queries';

export const useBorrowingDeals = (account: string, skip: number = 0) => {
    const [borrowingDeals, setBorrowingDeals] = useState([]);

    const fetchBorrowingDeals = useCallback(async () => {
        try {
            let res = await client.query({
                query: BORROW_DEALS,
                variables: {
                    account: account.toLowerCase(),
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.loans) {
                setBorrowingDeals(res?.data.loans);
            }
        } catch (err) {
            console.log(err);
        }
    }, [account, skip]);

    useEffect(() => {
        let isMounted = true;
        if (client && account !== '' && account !== null) {
            fetchBorrowingDeals();
        }
        return () => {
            isMounted = false;
        };
    }, [account, client]);

    return borrowingDeals;
};
