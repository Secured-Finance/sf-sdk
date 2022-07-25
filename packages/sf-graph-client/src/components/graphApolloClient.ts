import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';

import * as GraphClientDev from '../graphclients/development/.graphclient';
import * as GraphClientStg from '../graphclients/staging/.graphclient';

const getGraphClient = (network = 'none') => {
    let GraphClient;

    switch (process.env.SF_ENV) {
        case 'development':
            if (network !== 'rinkeby') {
                // eslint-disable-next-line no-console
                console.warn(`${network} is not a supported network.`);
            }
            GraphClient = GraphClientDev;
            break;

        case 'staging':
            if (network !== 'rinkeby') {
                // eslint-disable-next-line no-console
                console.warn(`${network} is not a supported network.`);
            }
            GraphClient = GraphClientStg;
            break;

        case 'production':
        default:
            // TODO: Set the GraphClient depending on a target network for production environment.
            // It will be the following.
            //
            // if (network === 'mainnet') {
            //     GraphClient = GraphClientMainnet;
            // } else if(network === 'rinkeby') {
            //     GraphClient = GraphClientRinkeby;
            // }
            //     :
            break;
    }

    return GraphClient;
};

export interface GraphApolloClientOption {
    network: string;
    cache?: InMemoryCache;
}

export class GraphApolloClient extends ApolloClient<NormalizedCacheObject> {
    constructor({ network, cache }: GraphApolloClientOption) {
        super({
            link: new GraphApolloLink(getGraphClient(network)),
            cache: cache || new InMemoryCache(),
        });
    }
}
