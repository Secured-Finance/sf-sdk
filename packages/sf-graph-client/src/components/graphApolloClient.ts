/* eslint-disable no-console */
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';

import * as GraphClient from '../graphclient';

const getGraphClient = (network = 'none') => {
    const sfNetwork = 'goerli';
    if (network !== 'goerli') {
        console.warn(`${network} is not a supported network.`);
    }

    console.info(
        `You are connecting the ${sfNetwork} data of the Secured Finance environment`
    );

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
