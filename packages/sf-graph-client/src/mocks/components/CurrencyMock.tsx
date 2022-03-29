import React from 'react';
import { useQuery } from '@apollo/client';
import { MockComponentProps } from './types';

export const CurrencyMock: React.FC<MockComponentProps> = ({
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

    return data.currency ? (
        <div key={data.currency.id}>
            <p>{`${data.currency.name}: ${data.currency.shortName}`}</p>
        </div>
    ) : null;
};
