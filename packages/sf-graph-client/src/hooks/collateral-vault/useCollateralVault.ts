import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { COLLATERAL_VAULT } from '../../queries';

export const useCollateralVault = (vault: string) => {
    const [collateralVault, setCollateralVault] = useState();

    const fetchCollateralVault = useCallback(async () => {
        try {
            let res = await client.query({
                query: COLLATERAL_VAULT,
                variables: {
                    vaultId: vault.toLowerCase(),
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.collateralVault) {
                setCollateralVault(res?.data.collateralVault);
            }
        } catch (err) {
            console.log(err);
        }
    }, [vault]);

    useEffect(() => {
        let isMounted = true;
        if (client) {
            fetchCollateralVault();
        }
        return () => {
            isMounted = false;
        };
    }, [client, vault]);

    return collateralVault;
};
