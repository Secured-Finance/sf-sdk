import { useQuery } from '@apollo/client';
import { BILATERAL_POSITIONS_FROM_VAULT } from '../../queries';

export const useBilateralPositionsFromVault = (vault: string, user: string) => {
    const variables = {
        vaultId: vault.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { loading, error, data } = useQuery(BILATERAL_POSITIONS_FROM_VAULT, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralVault) {
        return data.collateralVault;
    }
};
