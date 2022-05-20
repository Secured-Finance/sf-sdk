import { useQuery } from '@apollo/client';
import { Query, TimeSlot } from '../../generated';
import { TIME_SLOTS } from '../../queries';
import { QueryResult } from '../../utils';

export const useTimeSlots = (
    user: string,
    skip: number = 0
): QueryResult<Array<TimeSlot>> => {
    const variables = {
        address: user.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(TIME_SLOTS, {
        variables: variables,
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
            data: data.timeSlots,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
