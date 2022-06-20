import { useQuery } from '@apollo/client';
import {
    CollateralVaultDocument,
    CollateralVaultQuery,
} from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useCollateralVault = (
    vault: string
): QueryResult<CollateralVaultQuery> => {
    const variables = {
        vaultId: vault.toLowerCase(),
    };

    const { error, data } = useQuery<CollateralVaultQuery>(
        CollateralVaultDocument,
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

    if (data?.collateralVault) {
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
