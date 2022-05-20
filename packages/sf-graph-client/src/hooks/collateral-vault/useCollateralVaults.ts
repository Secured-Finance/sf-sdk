import { useQuery } from '@apollo/client';
import { CollateralVault, Query } from '../../generated';
import { COLLATERAL_VAULTS } from '../../queries';
import { QueryResult } from '../../utils';

export const useCollateralVaults = (
    skip: number = 0
): QueryResult<Array<CollateralVault>> => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<Query>(COLLATERAL_VAULTS, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.collateralVaults) {
        return {
            data: data.collateralVaults,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
