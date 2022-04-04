import { useQuery } from '@apollo/client';
import { BILATERAL_POSITION_FROM_VAULT } from '../../queries';
import { generateCurrencyId, packAddresses } from '../../utils';

export const useBilateralPositionFromVault = (
    vault: string,
    user: string,
    counterparty: string,
    ccyShortName: string
) => {
    const packedAddresses = packAddresses(user, counterparty);
    const currencyId = generateCurrencyId(ccyShortName);
    const positionId = packedAddresses[0] + '-' + vault.toLowerCase() + '-' + currencyId;

    const variables = {
        positionId: positionId,
    };

    const { loading, error, data } = useQuery(BILATERAL_POSITION_FROM_VAULT, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralVaultPosition) {
        return data.collateralVaultPosition;
    }
};
