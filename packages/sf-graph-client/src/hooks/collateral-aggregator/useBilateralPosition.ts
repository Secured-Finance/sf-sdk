import { useQuery } from '@apollo/client';
import { BILATERAL_POSITIONS } from '../../queries';

export const useBilateralPosition = (user: string) => {
    const variables = {
        address: user.toLowerCase(),
    };

    const { loading, error, data } = useQuery(BILATERAL_POSITIONS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.bilateralPositions) {
        return data.bilateralPositions;
    }
};
