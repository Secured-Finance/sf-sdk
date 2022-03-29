import { useQuery } from '@apollo/client';
import { COLLATERAL_VAULT } from '../../queries';

export const useCollateralBookFromVault = (vault: string, user: string) => {
    const variables = {
        vaultId: vault.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { loading, error, data } = useQuery(COLLATERAL_VAULT, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralVault) {
        return data.collateralVault;
    }
};
