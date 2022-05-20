import { useQuery } from '@apollo/client';
import { CrosschainAddress, Query } from '../../generated';
import { CROSSCHAIN_ADDRESS_BY_ID } from '../../queries';
import { generateCrosschainAddressID, QueryResult } from '../../utils';

export const useCrosschainAddressById = (
    user: string,
    chainId: number
): QueryResult<CrosschainAddress> => {
    const crosschainAddressId = generateCrosschainAddressID(user, chainId);

    const variables = {
        crosschainAddressId: crosschainAddressId.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(CROSSCHAIN_ADDRESS_BY_ID, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.crosschainAddress) {
        return {
            data: data.crosschainAddress,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
