import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { TERM } from '../../queries';
import { generateTermId } from '../../utils';

export const useTermInfo = (numberOfDays: number) => {
    const [term, setTerm] = useState();
    const termId = generateTermId(numberOfDays);

    const fetchTermInfo = useCallback(async () => {
        try {
            let res = await client.query({
                query: TERM,
                variables: {
                    id: termId,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.term) {
                setTerm(res?.data.term);
            }
        } catch (err) {
            console.log(err);
        }
    }, [numberOfDays]);

    useEffect(() => {
        if (client) {
            fetchTermInfo();
        }
    }, [client, numberOfDays]);

    return term;
};
