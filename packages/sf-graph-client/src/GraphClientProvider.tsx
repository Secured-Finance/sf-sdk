import { ApolloProvider, InMemoryCache } from '@apollo/client';
import * as React from 'react';
import { GraphApolloClient } from './GraphApolloClient';

export interface GraphClientProviderProps {
    network: string;
    cache: InMemoryCache;
    children: React.ReactNode | React.ReactNode[] | null;
}

export const GraphClientProvider: React.FC<GraphClientProviderProps> = ({
    network,
    cache,
    children,
}) => {
    return (
        <ApolloProvider client={new GraphApolloClient({ network, cache })}>
            {children}
        </ApolloProvider>
    );
};
