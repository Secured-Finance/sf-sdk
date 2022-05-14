import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { TERMS } from '../../queries';

export const useTerms = (skip: number = 0) => {
    const [terms, setTerms] = useState();

    const fetchTerms = useCallback(async () => {
        try {
            let res = await client.query({
                query: TERMS,
                variables: {
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.terms) {
                setTerms(res?.data.terms);
            }
        } catch (err) {
            console.log(err);
        }
    }, [skip]);

    useEffect(() => {
        if (client) {
            fetchTerms();
        }
    }, [client, skip]);

    return terms;
};
