import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';

import * as GraphClientDev from './graphclients/development/.graphclient';
import * as GraphClientStg from './graphclients/staging/.graphclient';

const getGraphClient = (network = 'none') => {
    let GraphClient;

    if (process.env.SF_ENV === 'development') {
        if (network !== 'rinkeby') {
            // eslint-disable-next-line no-console
            console.warn(`${network} is not a supported network.`);
        }
        GraphClient = GraphClientDev;
    } else if (process.env.SF_ENV === 'staging') {
        if (network !== 'rinkeby') {
            // eslint-disable-next-line no-console
            console.warn(`${network} is not a supported network.`);
        }
        GraphClient = GraphClientStg;
    } else if (process.env.SF_ENV === 'production') {
        // TODO: Set the GraphClient depending on a target network for production environment.
        // It will be the following.
        //
        // if (network === 'mainnet') {
        //     GraphClient = GraphClientMainnet;
        // } else if(network === 'rinkeby') {
        //     GraphClient = GraphClientRinkeby;
        // }
        //     :
    }

    return GraphClient;
};

interface GraphApolloClientOption {
    network: string;
}
export class GraphApolloClient extends ApolloClient<NormalizedCacheObject> {
    constructor({ network }: GraphApolloClientOption) {
        super({
            link: new GraphApolloLink(getGraphClient(network)),
            cache: new InMemoryCache(),
        });
    }
}
