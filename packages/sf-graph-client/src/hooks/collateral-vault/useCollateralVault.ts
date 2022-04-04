import { useQuery } from '@apollo/client';
import { COLLATERAL_VAULT } from '../../queries';

export const useCollateralVault = (vault: string) => {
    const variables = {
        vaultId: vault.toLowerCase(),
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
