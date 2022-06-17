import { useQuery } from '@apollo/client';
import {
    CloseOutNettingDocument,
    CloseOutNettingQuery,
} from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';
import { generateCloseOutNettingId } from '../../utils/id';

export const useCloseOutNetting = (
    user: string,
    counterparty: string,
    ccyShortName: string
): QueryResult<CloseOutNettingQuery> => {
    const closeOutNettingId = generateCloseOutNettingId(
        user,
        counterparty,
        ccyShortName
    );

    const variables = {
        id: closeOutNettingId,
    };

    const { error, data } = useQuery<CloseOutNettingQuery>(
        CloseOutNettingDocument,
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

    if (data?.closeOutNetting) {
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
