import { useQuery } from '@apollo/client';
import { CollateralVault, Query } from '../../generated';
import { COLLATERAL_VAULT } from '../../queries';
import { QueryResult } from '../../utils';

export const useCollateralVault = (
    vault: string
): QueryResult<CollateralVault> => {
    const variables = {
        vaultId: vault.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(COLLATERAL_VAULT, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.collateralVault) {
        return {
            data: data.collateralVault,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
