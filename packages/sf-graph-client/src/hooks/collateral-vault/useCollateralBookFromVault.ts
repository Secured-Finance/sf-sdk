import { useQuery } from '@apollo/client';
import {
    CollateralBookFromVaultDocument,
    CollateralBookFromVaultQuery,
} from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useCollateralBookFromVault = (
    vault: string,
    user: string
): QueryResult<CollateralBookFromVaultQuery> => {
    const variables = {
        vaultId: vault.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<CollateralBookFromVaultQuery>(
        CollateralBookFromVaultDocument,
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

    if (data?.collateralBooks[0]) {
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
