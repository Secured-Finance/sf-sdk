import { useCallback, useEffect, useState } from "react"
import { client } from "../../client"
import { COLLATERAL_VAULTS } from "../../queries"

export const useCollateralVaults = (skip: number = 0) => {
    const [collateralVaults, setCollateralVaults] = useState([])

    const fetchCollateralVaults = useCallback(async () => {
        try {
            let res = await client.query({
                query: COLLATERAL_VAULTS,
                variables: {
                    skip: skip,
                },
                fetchPolicy: 'cache-first',
            })
            if (res?.data.collateralVaults) {
                setCollateralVaults(res?.data.collateralVaults);
            }
        }
        catch (err) {
            console.log(err)
        }
	}, [skip])
    
	useEffect(() => {
        let isMounted = true;
		if (client) {
			fetchCollateralVaults();
        }
        return () => {
            isMounted = false
        };
	}, [client, skip])

    return collateralVaults
}
