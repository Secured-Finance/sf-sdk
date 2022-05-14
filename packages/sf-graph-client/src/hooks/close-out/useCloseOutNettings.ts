import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { CLOSE_OUT_NETTINGS } from '../../queries';
import { sortAddresses } from '../../utils';

export const useCloseOutNettings = (
    user: string,
    counterparty: string,
    skip: number = 0
) => {
    const [closeOutNettings, setCloseOutNettings] = useState();
    const sortedAddresses = sortAddresses(user, counterparty);

    const fetchCloseOutNettings = useCallback(async () => {
        try {
            let res = await client.query({
                query: CLOSE_OUT_NETTINGS,
                variables: {
                    address0: sortedAddresses[0],
                    address1: sortedAddresses[1],
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.closeOutNettings) {
                setCloseOutNettings(res?.data.closeOutNettings);
            }
        } catch (err) {
            console.log(err);
        }
    }, [user, counterparty, skip]);

    useEffect(() => {
        if (client) {
            fetchCloseOutNettings();
        }
    }, [client, user, counterparty, skip]);

    return closeOutNettings;
};
