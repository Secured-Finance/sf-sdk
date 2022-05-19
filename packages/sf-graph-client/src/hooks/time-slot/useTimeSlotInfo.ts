import { useQuery } from '@apollo/client';
import { Query, TimeSlot } from '../../generated';
import { TIME_SLOT } from '../../queries';
import { generateTimeSlotId, QueryResult } from '../../utils';

export const useTimeSlotInfo = (
    user: string,
    counterparty: string,
    ccyShortName: string,
    year: number,
    month: number,
    day: number
): QueryResult<TimeSlot> => {
    const timeSlotId = generateTimeSlotId(
        user,
        counterparty,
        ccyShortName,
        year,
        month,
        day
    );

    const variables = {
        id: timeSlotId,
    };

    const { error, data } = useQuery<Query>(TIME_SLOT, {
        variables: variables,
    });

    if (error) {
        console.error(error);

        return {
            data: undefined,
            error: error,
        };
    }

    if (data?.timeSlot) {
        return {
            data: data.timeSlot,
            error: null,
        };
    } else {
        return {
            data: undefined,
            error: undefined,
        };
    }
};
