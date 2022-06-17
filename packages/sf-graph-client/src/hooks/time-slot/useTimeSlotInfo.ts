import { useQuery } from '@apollo/client';
import { TimeSlotDocument, TimeSlotQuery } from '../../../.graphclient';
import { client } from '../../client';
import { generateTimeSlotId, QueryResult } from '../../utils';

export const useTimeSlotInfo = (
    user: string,
    counterparty: string,
    ccyShortName: string,
    year: number,
    month: number,
    day: number
): QueryResult<TimeSlotQuery> => {
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

    const { error, data } = useQuery<TimeSlotQuery>(TimeSlotDocument, {
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

    if (data?.timeSlot) {
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
