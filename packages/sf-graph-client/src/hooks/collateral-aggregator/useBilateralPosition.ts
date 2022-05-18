import { useQuery } from '@apollo/client';
import { BilateralPosition, Query } from '../../generated';
import { BILATERAL_POSITIONS } from '../../queries';

export const useBilateralPosition = (
    user: string
): Array<BilateralPosition> | undefined => {
    const variables = {
        address: user.toLowerCase(),
    };

    const { error, data } = useQuery<Query>(BILATERAL_POSITIONS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.bilateralPositions) {
        return data.bilateralPositions;
    } else {
        return undefined;
    }
};
