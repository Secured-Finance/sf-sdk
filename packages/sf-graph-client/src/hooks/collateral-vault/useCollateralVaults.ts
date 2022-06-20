import { useQuery } from '@apollo/client';
import {
    CollateralVaultsDocument,
    CollateralVaultsQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useCollateralVaults = (
    skip: number = 0
): QueryResult<CollateralVaultsQuery> => {
    const variables = {
        skip: skip,
    };

    const { error, data } = useQuery<CollateralVaultsQuery>(
        CollateralVaultsDocument,
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

    if (data?.collateralVaults) {
        return {
            data: data,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
