import { useQuery } from '@apollo/client';
import { CollateralVaultPosition, Query } from '../../generated';
import { BILATERAL_POSITION_FROM_VAULT } from '../../queries';
import { generateCurrencyId, packAddresses, QueryResult } from '../../utils';

export const useBilateralPositionFromVault = (
    vault: string,
    user: string,
    counterparty: string,
    ccyShortName: string
): QueryResult<CollateralVaultPosition> => {
    const packedAddresses = packAddresses(user, counterparty);
    const currencyId = generateCurrencyId(ccyShortName);
    const positionId =
        packedAddresses[0] + '-' + vault.toLowerCase() + '-' + currencyId;

    const variables = {
        positionId: positionId,
    };

    const { error, data } = useQuery<Query>(BILATERAL_POSITION_FROM_VAULT, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.collateralVaultPosition) {
        return {
            data: data.collateralVaultPosition,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
