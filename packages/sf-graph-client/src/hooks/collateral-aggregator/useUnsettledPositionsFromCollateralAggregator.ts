import { useQuery } from '@apollo/client';
import { UNSETTLED_POSITIONS_FROM_COLLATERAL_AGGREGATOR } from '../../queries';

export const useUnsettledPositionsFromCollateralAggregator = (
    aggregator: string,
    user: string
) => {
    const variables = {
        id: aggregator.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { loading, error, data } = useQuery(
        UNSETTLED_POSITIONS_FROM_COLLATERAL_AGGREGATOR,
        { variables: variables }
    );

    if (error) {
        console.log(error);
    }

    if (data?.collateralAggregator.collateralPositions) {
        return data.collateralAggregator.collateralPositions;
    }
};
