import { useQuery } from '@apollo/client';
import { CollateralVaultPosition, Query } from '../../generated';
import { BILATERAL_POSITIONS_FROM_VAULT } from '../../queries';

export const useBilateralPositionsFromVault = (
    vault: string,
    user: string
): Array<CollateralVaultPosition> | undefined => {
    const variables = {
        vaultId: vault.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(BILATERAL_POSITIONS_FROM_VAULT, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralVaultPositions) {
        return data.collateralVaultPositions;
    } else {
        return undefined;
    }
};
