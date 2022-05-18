import { useQuery } from '@apollo/client';
import { CollateralVault, Query } from '../../generated';
import { COLLATERAL_VAULT } from '../../queries';

export const useCollateralVault = (
    vault: string
): CollateralVault | undefined => {
    const variables = {
        vaultId: vault.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(COLLATERAL_VAULT, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralVault) {
        return data.collateralVault;
    } else {
        return undefined;
    }
};
