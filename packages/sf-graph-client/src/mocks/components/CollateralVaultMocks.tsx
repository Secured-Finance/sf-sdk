import React from "react";
import { useQuery } from '@apollo/client';
import { MockComponentProps } from "./types";
import { BilateralPosition, CollateralBook } from "../../utils";

export const CollateralBookMock: React.FC<MockComponentProps> = ({ query, variables }) => {
    const { loading, error, data } = useQuery(query, { variables: variables });

    if (loading) {
        return <p>Loading query</p>
    }

    if (error) {
        return <p>GraphQL Network Error</p>
    }

    return (
        data.collateralVault 
        ?
        data.collateralVault.collateralBooks.map((item: CollateralBook, index: number) => (
            <div key={item.id}>
                <p>{`Independent collateral for ${item.address} is ${item.independentCollateral}`}</p>
                <p>{`Locked collateral for ${item.address} is ${item.lockedCollateral}`}</p>
            </div>
        ))
        :
        null
    );
}

export const BilateralPositionMock: React.FC<MockComponentProps> = ({ query, variables }) => {
    const { loading, error, data } = useQuery(query, { variables: variables });

    if (loading) {
        return <p>Loading query</p>
    }

    if (error) {
        return <p>GraphQL Network Error</p>
    }

    return (
        data.collateralVault 
        ?
        data.collateralVault.collateralPositions.map((item: BilateralPosition, index: number) => (
            <div key={item.id}>
                <p>{`Locked collateral for ${item.address0} is ${item.lockedCollateral0}`}</p>
                <p>{`Locked collateral for ${item.address1} is ${item.lockedCollateral1}`}</p>
            </div>
        ))
        :
        null
    );
}
