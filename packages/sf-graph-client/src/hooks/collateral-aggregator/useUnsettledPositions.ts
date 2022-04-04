import { useQuery } from '@apollo/client';
import { UNSETTLED_POSITIONS } from '../../queries';

export const useUnsettledPositions = (user: string) => {
    const variables = {
        address: user.toLowerCase(),
    };

    const { loading, error, data } = useQuery(UNSETTLED_POSITIONS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.collateralPositions) {
        return data.collateralPositions;
    }
};
