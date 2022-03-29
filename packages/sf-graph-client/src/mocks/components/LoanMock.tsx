import React from 'react';
import { useQuery } from '@apollo/client';
import { MockComponentProps } from './types';
import { LoanQueryResponse } from '../../utils';

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

    return data.loans.map((item: LoanQueryResponse, index: number) => (
        <div key={item.id}>
            <p>{`${item.notional}: ${item.rate}`}</p>
        </div>
    ));
};
