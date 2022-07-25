import { ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { PropsWithChildren } from 'react';
import { GraphApolloClient } from './graphApolloClient';

export interface GraphClientProviderProps {
    network: string;
    cache: InMemoryCache;
}

export const GraphClientProvider = ({
    network,
    cache,
    children,
}: PropsWithChildren<GraphClientProviderProps>) => {
    return (
        <ApolloProvider client={new GraphApolloClient({ network, cache })}>
            {children}
        </ApolloProvider>
    );
};
