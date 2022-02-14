import { useQuery } from "@apollo/client"
import { COLLATERAL_AGGREGATOR } from "../../queries"

export const useCollateralAggregator = (aggregator: string) => {
    const variables = {
        id: aggregator.toLowerCase(),
    };

    const { loading, error, data } = useQuery(COLLATERAL_AGGREGATOR, { variables: variables });

    if (error) {
        console.log(error);
    }

    if (data?.collateralAggregator) {
        return data.collateralAggregator;
    }
}
