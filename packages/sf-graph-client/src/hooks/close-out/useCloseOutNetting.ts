import { useQuery } from '@apollo/client';
import { CloseOutNetting, Query } from '../../generated';
import { CLOSE_OUT_NETTING } from '../../queries';
import { generateCloseOutNettingId } from '../../utils/id';

export const useCloseOutNetting = (
    user: string,
    counterparty: string,
    ccyShortName: string
): CloseOutNetting | undefined => {
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
        console.log(error);
    }

    if (data?.closeOutNetting) {
        return data.closeOutNetting;
    } else {
        return undefined;
    }
};
