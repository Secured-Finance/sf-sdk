import { useQuery } from '@apollo/client';
import { Query } from '../../generated';
import { COLLATERAL_BOOK_FROM_VAULT } from '../../queries';
import { CollateralBook, QueryResult } from '../../utils';

export const useCollateralBookFromVault = (
    vault: string,
    user: string
): QueryResult<CollateralBook> => {
    const variables = {
        vaultId: vault.toLowerCase(),
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(COLLATERAL_BOOK_FROM_VAULT, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.collateralBooks[0]) {
        return {
            data: data.collateralBooks[0],
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
