import { useQuery } from '@apollo/client';
import { CollateralPosition, Query } from '../../generated';
import { UNSETTLED_POSITIONS } from '../../queries';
import { QueryResult } from '../../utils';

export const useUnsettledPositions = (
    user: string
): QueryResult<Array<CollateralPosition>> => {
    const variables = {
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(UNSETTLED_POSITIONS, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.collateralPositions) {
        return {
            data: data.collateralPositions,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
