import { useQuery } from '@apollo/client';
import React from 'react';
import { BilateralPosition, CollateralBook } from '../../utils';
import { MockComponentProps } from './types';

export const CollateralBookMock: React.FC<MockComponentProps> = ({
    query,
    variables,
}) => {
    const { loading, error, data } = useQuery(query, { variables: variables });

    if (loading) {
        return <p>Loading query</p>;
    }

    if (error) {
        return <p>GraphQL Network Error</p>;
    }

    return data.collateralBooks
        ? data.collateralBooks.map((item: CollateralBook) => (
              <div key={item.id}>
                  <p>{`Independent collateral for ${item.address} is ${item.independentCollateral}`}</p>
                  <p>{`Locked collateral for ${item.address} is ${item.lockedCollateral}`}</p>
              </div>
          ))
        : null;
};

export const BilateralPositionMock: React.FC<MockComponentProps> = ({
    query,
    variables,
}) => {
    const { loading, error, data } = useQuery(query, { variables: variables });

    if (loading) {
        return <p>Loading query</p>;
    }

    if (error) {
        return <p>GraphQL Network Error</p>;
    }

    return data.collateralVaultPositions
        ? data.collateralVaultPositions.map((item: BilateralPosition) => (
              <div key={item.id}>
                  <p>{`Locked collateral for ${item.address0} is ${item.lockedCollateral0}`}</p>
                  <p>{`Locked collateral for ${item.address1} is ${item.lockedCollateral1}`}</p>
              </div>
          ))
        : null;
};
