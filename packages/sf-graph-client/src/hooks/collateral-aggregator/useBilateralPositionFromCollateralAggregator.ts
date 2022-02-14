import { useQuery } from "@apollo/client"
import { BILATERAL_POSITIONS_FROM_COLLATERAL_AGGREGATOR } from "../../queries"

export const useBilateralPositionFromCollateralAggregator = (aggregator: string, user: string) => {
    const variables = {
        id: aggregator.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { loading, error, data } = useQuery(BILATERAL_POSITIONS_FROM_COLLATERAL_AGGREGATOR, { variables: variables });

    if (error) {
        console.log(error);
    }

    if (data?.collateralAggregator.bilateralPositions) {
        return data.collateralAggregator.bilateralPositions;
    }
}
