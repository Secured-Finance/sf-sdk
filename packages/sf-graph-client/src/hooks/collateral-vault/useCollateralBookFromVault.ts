import { useQuery } from '@apollo/client';
import { Query } from '../../generated';
import { COLLATERAL_BOOK_FROM_VAULT } from '../../queries';
import { CollateralBook } from '../../utils';

export const useCollateralBookFromVault = (
    vault: string,
    user: string
): CollateralBook | undefined => {
    const variables = {
        vaultId: vault.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(COLLATERAL_BOOK_FROM_VAULT, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralBooks[0]) {
        return data.collateralBooks[0];
    } else {
        return undefined;
    }
};
