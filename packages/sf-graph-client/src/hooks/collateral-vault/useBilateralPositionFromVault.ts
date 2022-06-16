import { useQuery } from '@apollo/client';
import {
    BilateralPositionFromVaultDocument,
    BilateralPositionFromVaultQuery,
} from '../../../.graphclient';
import { client } from '../../client';
import { generateCurrencyId, packAddresses, QueryResult } from '../../utils';

export const useBilateralPositionFromVault = (
    vault: string,
    user: string,
    counterparty: string,
    ccyShortName: string
): QueryResult<BilateralPositionFromVaultQuery> => {
    const packedAddresses = packAddresses(user, counterparty);
    const currencyId = generateCurrencyId(ccyShortName);
    const positionId =
        packedAddresses[0] + '-' + vault.toLowerCase() + '-' + currencyId;

    const variables = {
        positionId: positionId,
    };

    const { error, data } = useQuery<BilateralPositionFromVaultQuery>(
        BilateralPositionFromVaultDocument,
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

    if (data?.collateralVaultPosition) {
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
