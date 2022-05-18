import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { TIME_SLOT } from '../../queries';
import { generateTimeSlotId } from '../../utils';

export const useTimeSlotInfo = (
    user: string,
    counterparty: string,
    ccyShortName: string,
    year: number,
    month: number,
    day: number
) => {
    const [timeSlotInfo, setTimeSlotInfo] = useState();
    const timeSlotId = generateTimeSlotId(
        user,
        counterparty,
        ccyShortName,
        year,
        month,
        day
    );

    const fetchTimeSlotInfo = useCallback(async () => {
        try {
            let res = await client.query({
                query: TIME_SLOT,
                variables: {
                    id: timeSlotId,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.timeSlot) {
                setTimeSlotInfo(res?.data.timeSlot);
            }
        } catch (err) {
            console.log(err);
        }
    }, [user, counterparty, ccyShortName, year, month, day, timeSlotId]);

    useEffect(() => {
        if (client && timeSlotId) {
            fetchTimeSlotInfo();
        }
    }, [
        client,
        user,
        counterparty,
        ccyShortName,
        year,
        month,
        day,
        timeSlotId,
    ]);

    return timeSlotInfo;
};
