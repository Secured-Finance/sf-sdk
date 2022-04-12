import { useQuery } from '@apollo/client';
import { COLLATERAL_BOOK_FROM_VAULT } from '../../queries';

export const useCollateralBookFromVault = (vault: string, user: string) => {
    const variables = {
        vaultId: vault.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { loading, error, data } = useQuery(COLLATERAL_BOOK_FROM_VAULT, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralBooks[0]) {
        return data.collateralBooks[0];
    }
};
