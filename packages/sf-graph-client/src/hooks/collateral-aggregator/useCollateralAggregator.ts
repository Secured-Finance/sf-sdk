import { useQuery } from '@apollo/client';
import { COLLATERAL_AGGREGATOR } from '../../queries';

export const useCollateralAggregator = () => {
    const variables = {
        first: 1,
    };

    const { error, data } = useQuery(COLLATERAL_AGGREGATOR, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralAggregators) {
        return data.collateralAggregators[0];
    }
};
