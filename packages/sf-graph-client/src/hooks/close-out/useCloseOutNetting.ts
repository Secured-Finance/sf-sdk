import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { CLOSE_OUT_NETTING } from '../../queries';
import { generateCloseOutNettingId } from '../../utils/id';

export const useCloseOutNetting = (
    user: string,
    counterparty: string,
    ccyShortName: string
) => {
    const [closeOutNetting, setCloseOutNetting] = useState();
    const closeOutNettingId = generateCloseOutNettingId(
        user,
        counterparty,
        ccyShortName
    );

    const fetchCloseOutNetting = useCallback(async () => {
        try {
            let res = await client.query({
                query: CLOSE_OUT_NETTING,
                variables: {
                    id: closeOutNettingId,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.closeOutNetting) {
                setCloseOutNetting(res?.data.closeOutNetting);
            }
        } catch (err) {
            console.log(err);
        }
    }, [user, counterparty, ccyShortName]);

    useEffect(() => {
        let isMounted = true;
        if (client) {
            fetchCloseOutNetting();
        }
        return () => {
            isMounted = false;
        };
    }, [client, user, counterparty, ccyShortName]);

    return closeOutNetting;
};
