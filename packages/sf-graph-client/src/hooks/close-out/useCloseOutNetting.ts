import { useQuery } from '@apollo/client';
import { CloseOutNetting, Query } from '../../generated';
import { CLOSE_OUT_NETTING } from '../../queries';
import { QueryResult } from '../../utils';
import { generateCloseOutNettingId } from '../../utils/id';

export const useCloseOutNetting = (
    user: string,
    counterparty: string,
    ccyShortName: string
): QueryResult<CloseOutNetting> => {
    const closeOutNettingId = generateCloseOutNettingId(
        user,
        counterparty,
        ccyShortName
    );

    const variables = {
        id: closeOutNettingId,
    };

    const { error, data } = useQuery<Query>(CLOSE_OUT_NETTING, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.closeOutNetting) {
        return {
            data: data.closeOutNetting,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
