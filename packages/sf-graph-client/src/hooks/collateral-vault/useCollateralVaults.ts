import { useQuery } from '@apollo/client';
import { COLLATERAL_VAULTS } from '../../queries';

export const useCollateralVaults = (skip: number = 0) => {
    const variables = {
        skip: skip,
    };

    const { loading, error, data } = useQuery(COLLATERAL_VAULTS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralVaults) {
        return data.collateralVaults;
    }

};
