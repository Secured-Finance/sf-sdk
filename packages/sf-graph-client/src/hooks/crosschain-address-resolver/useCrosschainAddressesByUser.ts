import { useQuery } from '@apollo/client';
import {
    CrosschainAddressesByUserDocument,
    CrosschainAddressesByUserQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useCrosschainAddressesByUser = (
    user: string,
    skip = 0
): QueryResult<CrosschainAddressesByUserQuery> => {
    const variables = {
        user: user.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<CrosschainAddressesByUserQuery>(
        CrosschainAddressesByUserDocument,
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

    if (data?.crosschainAddresses) {
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
