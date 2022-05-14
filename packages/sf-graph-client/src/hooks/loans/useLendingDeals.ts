import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { LOAN_DEALS } from '../../queries';

export const useLendingDeals = (account: string, skip: number = 0) => {
    const [lendingDeals, setLendingDeals] = useState([]);

    const fetchLendingDeals = useCallback(async () => {
        try {
            let res = await client.query({
                query: LOAN_DEALS,
                variables: {
                    account: account.toLowerCase(),
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.loans) {
                setLendingDeals(res?.data.loans);
            }
        } catch (err) {
            console.log(err);
        }
    }, [account, skip]);

    useEffect(() => {
        if (client && account !== '' && account !== null) {
            fetchLendingDeals();
        }
    }, [account, client]);

    return lendingDeals;
};
