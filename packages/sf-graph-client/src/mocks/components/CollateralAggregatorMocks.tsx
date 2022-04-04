import React from 'react';
import { useQuery } from '@apollo/client';
import { MockComponentProps } from './types';
import {
    BilateralNetting,
    CollateralNetting,
    UnsettledCollateral,
} from '../../utils';

export const UnsettledPositionMock: React.FC<MockComponentProps> = ({
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

    return data
        ? data.collateralPositions.map(
              (item: UnsettledCollateral, index: number) => (
                  <div key={item.id}>
                      <p>{`Unsettled present value for ${item.address} is ${item.unsettledPV}`}</p>
                  </div>
              )
          )
        : null;
};

export const BilateralNettingMock: React.FC<MockComponentProps> = ({
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

    return data
        ? data.bilateralPositions.map(
              (item: BilateralNetting) => (
                  <div key={item.id}>
                      {item.collateralNettings.map(
                          (netting: CollateralNetting) => {
                              return (
                                  <div key={netting.currency.name}>
                                      <p>{`Unsettled PV for ${item.address0} is ${netting.unsettled0PV}`}</p>
                                      <p>{`Settled PV for ${item.address0} is ${netting.party0PV}`}</p>
                                      <p>{`Unsettled PV for ${item.address1} is ${netting.unsettled1PV}`}</p>
                                      <p>{`Settled PV for ${item.address1} is ${netting.party1PV}`}</p>
                                      <p>{`Net PV for ${item.address0} and ${item.address1} is ${netting.netPV}`}</p>
                                  </div>
                              );
                          }
                      )}
                  </div>
              )
          )
        : null;
};
