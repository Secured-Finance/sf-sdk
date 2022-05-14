import { useQuery } from '@apollo/client';
import { CROSSCHAIN_ADDRESS_BY_ID } from '../../queries';
import { generateCrosschainAddressID } from '../../utils';

export const useCrosschainAddressById = (user: string, chainId: number) => {
    const crosschainAddressId = generateCrosschainAddressID(user, chainId);

    const variables = {
        crosschainAddressId: crosschainAddressId.toLowerCase(),
    };

    const { error, data } = useQuery(CROSSCHAIN_ADDRESS_BY_ID, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.crosschainAddress) {
        return data.crosschainAddress;
    }
};
