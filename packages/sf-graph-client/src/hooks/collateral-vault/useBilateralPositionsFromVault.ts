import { useQuery } from '@apollo/client';
import { CollateralVaultPosition, Query } from '../../generated';
import { BILATERAL_POSITIONS_FROM_VAULT } from '../../queries';
import { QueryResult } from '../../utils';

export const useBilateralPositionsFromVault = (
    vault: string,
    user: string
): QueryResult<Array<CollateralVaultPosition>> => {
    const variables = {
        vaultId: vault.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(BILATERAL_POSITIONS_FROM_VAULT, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.collateralVaultPositions) {
        return {
            data: data.collateralVaultPositions,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
