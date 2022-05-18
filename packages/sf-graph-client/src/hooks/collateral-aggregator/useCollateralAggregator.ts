import { useQuery } from '@apollo/client';
import { CollateralAggregator, Query } from '../../generated';
import { COLLATERAL_AGGREGATOR } from '../../queries';

export const useCollateralAggregator = (): CollateralAggregator | undefined => {
    const variables = {
        first: 1,
    };

    const { error, data } = useQuery<Query>(COLLATERAL_AGGREGATOR, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralAggregators) {
        return data.collateralAggregators[0];
    } else {
        return undefined;
    }
};
