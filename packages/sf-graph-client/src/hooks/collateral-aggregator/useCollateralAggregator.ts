import { useQuery } from '@apollo/client';
import { CollateralAggregator, Query } from '../../generated';
import { COLLATERAL_AGGREGATOR } from '../../queries';
import { QueryResult } from '../../utils';

export const useCollateralAggregator =
    (): QueryResult<CollateralAggregator> => {
        const variables = {
            first: 1,
        };

        const { error, data } = useQuery<Query>(COLLATERAL_AGGREGATOR, {
            variables: variables,
        });

        if (error) {
            console.error(error);

            return {
                data: undefined,
                error: error,
            };
        }

        if (data?.collateralAggregators) {
            return {
                data: data.collateralAggregators[0],
                error: null,
            };
        } else {
            return {
                data: undefined,
                error: undefined,
            };
        }
    };
