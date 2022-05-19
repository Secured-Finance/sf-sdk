import { useQuery } from '@apollo/client';
import { BilateralPosition, Query } from '../../generated';
import { BILATERAL_POSITIONS } from '../../queries';
import { QueryResult } from '../../utils';

export const useBilateralPosition = (
    user: string
): QueryResult<Array<BilateralPosition>> => {
    const variables = {
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(BILATERAL_POSITIONS, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.bilateralPositions) {
        return {
            data: data.bilateralPositions,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
