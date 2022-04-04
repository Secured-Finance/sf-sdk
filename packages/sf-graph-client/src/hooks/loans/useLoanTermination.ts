import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { LOAN_TERMINATION } from '../../queries';

export const useLoanTermination = (id: string, skip: number = 0) => {
    const [loanTermination, setLoanTermination] = useState();

    const fetchLoanTermination = useCallback(async () => {
        try {
            let res = await client.query({
                query: LOAN_TERMINATION,
                variables: {
                    id: id,
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.loanTerminations) {
                setLoanTermination(res?.data.loanTerminations);
            }
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    useEffect(() => {
        let isMounted = true;
        if (client) {
            fetchLoanTermination();
        }
        return () => {
            isMounted = false;
        };
    }, [client, id]);

    return loanTermination;
};
