import { useQuery } from '@apollo/client';
import { TimeSlotsDocument, TimeSlotsQuery } from '../../.graphclient';
import { client } from '../../client';
import { QueryResult } from '../../utils';

export const useTimeSlots = (
    user: string,
    skip: number = 0
): QueryResult<TimeSlotsQuery> => {
    const variables = {
        address: user.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<TimeSlotsQuery>(TimeSlotsDocument, {
        variables: variables,
        client: client,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.timeSlots) {
        return {
            data: data,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
