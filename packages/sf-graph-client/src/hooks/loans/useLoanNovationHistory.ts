import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { LOAN_NOVATION_HISTORY } from '../../queries';

export const useLoanNovationHistory = (id: string, skip: number = 0) => {
    const [novationHistory, setNovationHistory] = useState();

    const fetchLoanNovationHistory = useCallback(async () => {
        try {
            let res = await client.query({
                query: LOAN_NOVATION_HISTORY,
                variables: {
                    id: id,
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.loanNovations) {
                setNovationHistory(res?.data.loanNovations);
            }
        } catch (err) {
            console.log(err);
        }
    }, [id, skip]);

    useEffect(() => {
        let isMounted = true;
        if (client) {
            fetchLoanNovationHistory();
        }
        return () => {
            isMounted = false;
        };
    }, [client, id, skip]);

    return novationHistory;
};
