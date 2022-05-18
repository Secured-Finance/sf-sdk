import { useQuery } from '@apollo/client';
import { Query, TimeSlot } from '../../generated';
import { TIME_SLOTS } from '../../queries';

export const useTimeSlots = (
    user: string,
    skip: number = 0
): Array<TimeSlot> | undefined => {
    const variables = {
        address: user.toLowerCase(),
        skip: skip,
    };

    const { error, data } = useQuery<Query>(TIME_SLOTS, {
        variables: variables,
    });

    if (error) {
        console.log(error);
    }

    if (data?.timeSlots) {
        return data.timeSlots;
    } else {
        return undefined;
    }
};
