import { useQuery } from '@apollo/client';
import {
    UnsettledPositionsDocument,
    UnsettledPositionsQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useUnsettledPositions = (
    user: string
): QueryResult<UnsettledPositionsQuery> => {
    const variables = {
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<UnsettledPositionsQuery>(
        UnsettledPositionsDocument,
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

    if (data?.collateralPositions) {
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
