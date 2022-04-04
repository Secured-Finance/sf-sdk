import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

export const client = new ApolloClient({
    link: new HttpLink({
        // uri: 'https://api.thegraph.com/subgraphs/name/bahadylbekov/secured-finance-ropsten',
        uri: 'http://127.0.0.1:8000/subgraphs/name/bahadylbekov/secured-finance-protocol',
        fetch: fetch,
    }),
    cache: new InMemoryCache(),
});
