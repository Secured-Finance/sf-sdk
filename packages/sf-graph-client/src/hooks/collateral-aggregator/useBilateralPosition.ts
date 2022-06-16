import { useQuery } from '@apollo/client';
import {
    BilateralPositionsDocument,
    BilateralPositionsQuery,
} from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useBilateralPosition = (
    user: string
): QueryResult<BilateralPositionsQuery> => {
    const variables = {
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<BilateralPositionsQuery>(
        BilateralPositionsDocument,
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

    if (data?.bilateralPositions) {
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
