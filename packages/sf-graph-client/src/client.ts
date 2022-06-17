import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';
import * as GraphClient from '../.graphclient';

export const client = new ApolloClient({
    link: new GraphApolloLink(GraphClient),
    cache: new InMemoryCache(),
});
