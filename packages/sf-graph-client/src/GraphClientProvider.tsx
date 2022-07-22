import { ApolloProvider } from '@apollo/client';
import * as React from 'react';
import { GraphApolloClient } from './GraphApolloClient';

interface GraphClientProviderProps {
    network: string;
    children: React.ReactNode | React.ReactNode[] | null;
}

export const GraphClientProvider: React.FC<GraphClientProviderProps> = ({
    network,
    children,
}) => {
    return (
        <ApolloProvider client={new GraphApolloClient({ network })}>
            {children}
        </ApolloProvider>
    );
};
