import { useQuery } from '@apollo/client';
import { CollateralPosition, Query } from '../../generated';
import { UNSETTLED_POSITIONS } from '../../queries';

export const useUnsettledPositions = (
    user: string
): Array<CollateralPosition> | undefined => {
    const variables = {
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(UNSETTLED_POSITIONS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralPositions) {
        return data.collateralPositions;
    } else {
        return undefined;
    }
};
