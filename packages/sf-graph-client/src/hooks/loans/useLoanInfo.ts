import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { LOAN_INFO } from '../../queries';

export const useLoanInfo = (id: string) => {
    const [loanInfo, setLoanInfo] = useState();

    const fetchLoanInformation = useCallback(async () => {
        try {
            let res = await client.query({
                query: LOAN_INFO,
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
        if (client && id !== '' && id !== null) {
            fetchLoanInformation();
        }
    }, [client, id]);

    return loanInfo;
};
