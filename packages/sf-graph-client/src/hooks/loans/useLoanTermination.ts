import { useCallback, useEffect, useState } from "react"
import { client } from "../../client"
import { LOAN_TERMINATION } from "../../queries"

export const useLoanTermination = (id: string) => {
    const [loanTermination, setLoanTermination] = useState()

    const fetchLoanTermination = useCallback(async () => {
        try {
            let res = await client.query({
                query: LOAN_TERMINATION,
                variables: {
                    id: id,
                },
                fetchPolicy: 'cache-first',
            })
            if (res?.data.loan.termination) {
                setLoanTermination(res?.data.loan.termination);
            }
        }
        catch (err) {
            console.log(err)
        }
	}, [id])
    
	useEffect(() => {
        let isMounted = true;
		if (client) {
			fetchLoanTermination();
        }
        return () => {
            isMounted = false
        };
	}, [client, id])

    return loanTermination
}
