import { useCallback, useEffect, useState } from "react"
import { client } from "../../client"
import { LOAN_NOVATION_HISTORY } from "../../queries"

export const useLoanNovationHistory = (id: string, skip: number) => {
    const [novationHistory, setNovationHistory] = useState()

    const fetchLoanNovationHistory = useCallback(async () => {
        try {
            let res = await client.query({
                query: LOAN_NOVATION_HISTORY,
                variables: {
                    id: id,
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            })
            if (res?.data.loan.novationHistory) {
                setNovationHistory(res?.data.loan.novationHistory);
            }
        }
        catch (err) {
            console.log(err)
        }
	}, [id, skip])
    
	useEffect(() => {
        let isMounted = true;
		if (client) {
			fetchLoanNovationHistory();
        }
        return () => {
            isMounted = false
        };
	}, [client, id, skip])

    return novationHistory
}
