import { useQuery } from '@apollo/client';
import {
    CollateralAggregator,
    CollateralAggregatorDocument,
    CollateralAggregatorQuery,
} from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useCollateralAggregator =
    (): QueryResult<CollateralAggregator> => {
        const variables = {
            first: 1,
        };

        const { error, data } = useQuery<CollateralAggregatorQuery>(
            CollateralAggregatorDocument,
            {
                variables: variables,
                client: client,
            }
        );

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
