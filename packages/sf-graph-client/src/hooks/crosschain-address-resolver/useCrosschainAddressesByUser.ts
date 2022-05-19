import { useQuery } from '@apollo/client';
import { CrosschainAddress, Query } from '../../generated';
import { CROSSCHAIN_ADDRESSES_BY_USER } from '../../queries';
import { QueryResult } from '../../utils';

export const useCrosschainAddressesByUser = (
    user: string,
    skip: number = 0
): QueryResult<Array<CrosschainAddress>> => {
    const variables = {
        user: user.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(CROSSCHAIN_ADDRESSES_BY_USER, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.crosschainAddresses) {
        return {
            data: data.crosschainAddresses,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
