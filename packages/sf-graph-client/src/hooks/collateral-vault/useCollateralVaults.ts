import { useQuery } from '@apollo/client';
import { CollateralVault, Query } from '../../generated';
import { COLLATERAL_VAULTS } from '../../queries';

export const useCollateralVaults = (
    skip: number = 0
): Array<CollateralVault> | undefined => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<Query>(COLLATERAL_VAULTS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralVaults) {
        return data.collateralVaults;
    } else {
        return undefined;
    }
};
