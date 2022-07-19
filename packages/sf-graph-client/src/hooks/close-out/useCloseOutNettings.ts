import { useQuery } from '@apollo/client';
import {
    CloseOutNettingsDocument,
    CloseOutNettingsQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { QueryResult, sortAddresses } from '../../utils';

export const useCloseOutNettings = (
    user: string,
    counterparty: string,
    skip = 0
): QueryResult<CloseOutNettingsQuery> => {
    const sortedAddresses = sortAddresses(user, counterparty);

    const variables = {
        address0: sortedAddresses[0],
        address1: sortedAddresses[1],
        skip: skip,
    };

    const { error, data } = useQuery<CloseOutNettingsQuery>(
        CloseOutNettingsDocument,
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

    if (data?.closeOutNettings) {
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
