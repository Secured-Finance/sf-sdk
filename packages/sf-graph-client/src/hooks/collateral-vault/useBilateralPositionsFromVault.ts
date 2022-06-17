import { useQuery } from '@apollo/client';
import {
    BilateralPositionsFromVaultDocument,
    BilateralPositionsFromVaultQuery,
} from '../../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useBilateralPositionsFromVault = (
    vault: string,
    user: string
): QueryResult<BilateralPositionsFromVaultQuery> => {
    const variables = {
        vaultId: vault.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<BilateralPositionsFromVaultQuery>(
        BilateralPositionsFromVaultDocument,
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

    if (data?.collateralVaultPositions) {
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
