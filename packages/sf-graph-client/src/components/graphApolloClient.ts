/* eslint-disable no-console */
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';

import * as GraphClientDev from '../graphclients/development/.graphclient';
import * as GraphClientStg from '../graphclients/staging/.graphclient';
import * as GraphClientProdSepolia from '../graphclients/production/sepolia/.graphclient';
import * as GraphClientProdMainnet from '../graphclients/production/mainnet/.graphclient';

const environments = ['development', 'staging', 'production'] as const;
type Environments = (typeof environments)[number];

const getGraphClient = (network = 'none') => {
    let GraphClient;
    let sfEnv: Environments | undefined;
    let sfNetwork: string;

    switch (process.env.SF_ENV) {
        case 'development':
            sfEnv = 'development';
            sfNetwork = 'sepolia';
            if (network !== 'sepolia') {
                console.warn(`${network} is not a supported network.`);
            }
            GraphClient = GraphClientDev;
            break;

        case 'staging':
            sfEnv = 'staging';
            sfNetwork = 'sepolia';
            if (network !== 'sepolia') {
                console.warn(`${network} is not a supported network.`);
            }
            GraphClient = GraphClientStg;
            break;

        case 'production':
        default:
            sfEnv = 'production';
            sfNetwork = network;
            if (network === 'mainnet') {
                GraphClient = GraphClientProdMainnet;
            } else if (network === 'sepolia') {
                GraphClient = GraphClientProdSepolia;
            } else {
                console.warn(`${network} is not a supported network.`);
            }
            break;
    }

    console.info(
        `You are connecting the ${sfNetwork} data of the Secured Finance ${sfEnv} environment`
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
