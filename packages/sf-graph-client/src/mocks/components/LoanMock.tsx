import { useQuery } from '@apollo/client';
import React from 'react';
import { LoanQueryResponse } from '../../utils';
import { MockComponentProps } from './types';

export const LoanMock: React.FC<MockComponentProps> = ({
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

    return data.loans.map((item: LoanQueryResponse) => (
        <div key={item.id}>
            <p>{`${item.notional}: ${item.rate}`}</p>
        </div>
    ));
};
