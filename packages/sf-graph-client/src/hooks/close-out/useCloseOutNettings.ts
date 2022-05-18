import { useQuery } from '@apollo/client';
import { CloseOutNetting, Query } from '../../generated';
import { CLOSE_OUT_NETTINGS } from '../../queries';
import { sortAddresses } from '../../utils';

export const useCloseOutNettings = (
    user: string,
    counterparty: string,
    skip: number = 0
): Array<CloseOutNetting> | undefined => {
    const sortedAddresses = sortAddresses(user, counterparty);

    const variables = {
        address0: sortedAddresses[0],
        address1: sortedAddresses[1],
        skip: skip,
    };

    const { error, data } = useQuery<Query>(CLOSE_OUT_NETTINGS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.closeOutNettings) {
        return data.closeOutNettings;
    } else {
        return undefined;
    }
};
