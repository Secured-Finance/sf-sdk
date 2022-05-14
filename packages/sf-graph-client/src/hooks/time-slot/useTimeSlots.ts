import { useCallback, useEffect, useState } from 'react';
import { client } from '../../client';
import { TIME_SLOTS } from '../../queries';

export const useTimeSlots = (user: string, skip: number = 0) => {
    const [timeSlots, setTimeSlots] = useState();

    const fetchTimeSlots = useCallback(async () => {
        try {
            let res = await client.query({
                query: TIME_SLOTS,
                variables: {
                    address: user.toLowerCase(),
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            });
            if (res?.data.timeSlots) {
                setTimeSlots(res?.data.timeSlots);
            }
        } catch (err) {
            console.log(err);
        }
    }, [user, skip]);

    useEffect(() => {
        if (client) {
            fetchTimeSlots();
        }
    }, [client, user, skip]);

    return timeSlots;
};
