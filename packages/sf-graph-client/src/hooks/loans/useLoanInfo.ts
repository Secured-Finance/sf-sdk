import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { BORROW_DEALS } from '../../queries';

export const useLoanInfo = (id: string) => {
    const [loanInfo, setLoanInfo] = useState();

    const fetchLoanInformation = useCallback(async () => {
        try {
            let res = await client.query({
                query: BORROW_DEALS,
                variables: {
                    id: id,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.loan) {
                setLoanInfo(res?.data.loan);
            }
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    useEffect(() => {
        let isMounted = true;
        if (client) {
            fetchLoanInformation();
        }
        return () => {
            isMounted = false;
        };
    }, [client, id]);

    return loanInfo;
};
