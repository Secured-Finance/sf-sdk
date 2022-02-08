import { useCallback, useEffect, useState } from "react"
import { client } from "../../client"
import { TIME_SLOT } from "../../queries"
import { generateCurrencyId, packAddresses } from "../../utils";

export const useTimeSlotInfo = (
    user: string, 
    counterparty: string, 
    ccyShortName: string,
    year: number,
    month: number,
    day: number
) => {
    const [timeSlotInfo, setTimeSlotInfo] = useState();
    const packedAddresses = packAddresses(user, counterparty);
    const ccyId = generateCurrencyId(ccyShortName);
    const timeSlotId = packedAddresses + '-' + ccyId + '-' + year.toString() + '-' + month.toString() + '-' + day.toString()

    const fetchTimeSlotInfo = useCallback(async () => {
        try {
            let res = await client.query({
                query: TIME_SLOT,
                variables: {
                    id: timeSlotId,
                },
                fetchPolicy: 'cache-first',
            })
            if (res?.data.timeSlot) {
                setTimeSlotInfo(res?.data.timeSlot);
            }
        }
        catch (err) {
            console.log(err)
        }
	}, [user, counterparty, ccyShortName, year, month, day])
    
	useEffect(() => {
        let isMounted = true;
		if (client) {
			fetchTimeSlotInfo();
        }
        return () => {
            isMounted = false
        };
	}, [client, user, counterparty, ccyShortName, year, month, day])

    return timeSlotInfo
}
