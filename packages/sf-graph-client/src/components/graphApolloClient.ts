/* eslint-disable no-console */
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';

import * as GraphClientDev from '../graphclients/development/.graphclient';
import * as GraphClientStg from '../graphclients/staging/.graphclient';
import * as GraphClientSepolia from '../graphclients/sepolia/.graphclient';
import * as GraphClientMainnet from '../graphclients/mainnet/.graphclient';

const environments = ['development', 'staging', 'production'] as const;
type Environments = (typeof environments)[number];

const getGraphClient = (network = 'none') => {
    let GraphClient;
    let sfEnv: Environments | undefined;

    switch (process.env.SF_ENV) {
        case 'development':
            sfEnv = 'development';
            if (network === 'sepolia') {
                console.info(
                    `You are connecting the ${network} data of the Secured Finance ${sfEnv} environment`
                );
            } else {
                console.warn(`${network} is not a supported network.`);
            }
            GraphClient = GraphClientDev;
            break;

        case 'staging':
            sfEnv = 'staging';
            if (network === 'sepolia') {
                console.info(
                    `You are connecting the ${network} data of the Secured Finance ${sfEnv} environment`
                );
            } else {
                console.warn(`${network} is not a supported network.`);
            }
            GraphClient = GraphClientStg;
            break;

        case 'production':
        default:
            sfEnv = 'production';
            if (network === 'mainnet') {
                GraphClient = GraphClientMainnet;
                console.info(
                    `You are connecting the ${network} data of the Secured Finance ${sfEnv} environment`
                );
                // } else if (network === 'sepolia') {
                //     GraphClient = GraphClientSepolia;
            } else {
                GraphClient = GraphClientSepolia;
                console.warn(`${network} is not a supported network.`);
            }
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
