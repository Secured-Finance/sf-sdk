import { useQuery } from '@apollo/client';
import {
    CrosschainAddressByIdDocument,
    CrosschainAddressByIdQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { generateCrosschainAddressID, QueryResult } from '../../utils';

export const useCrosschainAddressById = (
    user: string,
    chainId: number
): QueryResult<CrosschainAddressByIdQuery> => {
    const crosschainAddressId = generateCrosschainAddressID(user, chainId);

    const variables = {
        crosschainAddressId: crosschainAddressId.toLowerCase(),
    };

    const { error, data } = useQuery<CrosschainAddressByIdQuery>(
        CrosschainAddressByIdDocument,
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

    if (data?.crosschainAddress) {
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
