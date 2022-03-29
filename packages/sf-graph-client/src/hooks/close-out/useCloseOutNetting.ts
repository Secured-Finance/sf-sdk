import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { CLOSE_OUT_NETTING } from '../../queries';
import { generateCurrencyId, packAddresses } from '../../utils';

export const useCloseOutNetting = (
    user: string,
    counterparty: string,
    ccyShortName: string
) => {
    const [closeOutNetting, setCloseOutNetting] = useState();
    const packedAddresses = packAddresses(user, counterparty);
    const currencyId = generateCurrencyId(ccyShortName);
    const closeOutNettingId = packedAddresses + '-' + currencyId;

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
