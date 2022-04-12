import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { COLLATERAL_VAULTS } from '../../queries';

export const useCollateralVaults = (skip: number = 0) => {
    const [collateralVaults, setCollateralVaults] = useState(null);

    const variables = {
        skip: skip,
    };

    const { loading, error, data } = useQuery(COLLATERAL_VAULTS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    useMemo(() => {
        if (data?.collateralVaults) {
            setCollateralVaults(data?.collateralVaults);
        }
    }, [data?.collateralVaults]);

    return collateralVaults;
};
