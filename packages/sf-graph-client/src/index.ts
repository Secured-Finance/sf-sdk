import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import  * as utils  from './utils';

export const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.thegraph.com/subgraphs/name/bahadylbekov/secured-finance-ropsten',
    }),
    cache: new InMemoryCache(),
})
