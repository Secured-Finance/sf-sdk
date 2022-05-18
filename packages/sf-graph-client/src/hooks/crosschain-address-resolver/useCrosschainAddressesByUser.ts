import { useQuery } from '@apollo/client';
import { CROSSCHAIN_ADDRESSES_BY_USER } from '../../queries';

export const useCrosschainAddressesByUser = (
    user: string,
    skip: number = 0
) => {
    const variables = {
        user: user.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery(CROSSCHAIN_ADDRESSES_BY_USER, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.crosschainAddresses) {
        return data.crosschainAddresses;
    }
};
