/* eslint-disable no-console */
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';

// Production clients
import * as GraphClientArbitrumOne from '../graphclients/arbitrum-one/.graphclient';
import * as GraphClientArbitrumSepolia from '../graphclients/arbitrum-sepolia/.graphclient';
// import * as GraphClientAvalancheMainnet from '../graphclients/avalanche-mainnet/.graphclient';
import * as GraphClientMainnet from '../graphclients/mainnet/.graphclient';
import * as GraphClientSepolia from '../graphclients/sepolia/.graphclient';
// Staging clients
import * as GraphClientStgArb from '../graphclients/staging-arb/.graphclient';
import * as GraphClientStgAva from '../graphclients/staging-ava/.graphclient';
import * as GraphClientStg from '../graphclients/staging/.graphclient';
// Development clients
import * as GraphClientDevArb from '../graphclients/development-arb/.graphclient';
import * as GraphClientDevAva from '../graphclients/development-ava/.graphclient';
import * as GraphClientDev from '../graphclients/development/.graphclient';

const environments = ['development', 'staging', 'production'] as const;
type Environments = (typeof environments)[number];

const getGraphClient = (network = 'none') => {
    let GraphClient;
    let sfEnv: Environments | undefined;
    let sfNetwork: string;

    switch (process.env.SF_ENV) {
        case 'development':
            sfEnv = 'development';
            sfNetwork = network;
            if (network === 'sepolia') {
                GraphClient = GraphClientDev;
            } else if (network === 'arbitrum-sepolia') {
                GraphClient = GraphClientDevArb;
            } else if (network === 'avalanche-fuji') {
                GraphClient = GraphClientDevAva;
            } else {
                GraphClient = GraphClientDev;
                sfNetwork = 'sepolia';
                console.warn(`${network} is not a supported network.`);
            }
            break;

        case 'staging':
            sfEnv = 'staging';
            sfNetwork = network;
            if (network === 'sepolia') {
                GraphClient = GraphClientStg;
            } else if (network === 'arbitrum-sepolia') {
                GraphClient = GraphClientStgArb;
            } else if (network === 'avalanche-fuji') {
                GraphClient = GraphClientStgAva;
            } else {
                GraphClient = GraphClientStg;
                sfNetwork = 'sepolia';
                console.warn(`${network} is not a supported network.`);
            }
            break;

        case 'production':
        default:
            sfEnv = 'production';
            sfNetwork = network;
            if (network === 'mainnet') {
                GraphClient = GraphClientMainnet;
            } else if (network === 'sepolia') {
                GraphClient = GraphClientSepolia;
            } else if (network === 'arbitrum-one') {
                GraphClient = GraphClientArbitrumOne;
            } else if (network === 'arbitrum-sepolia') {
                GraphClient = GraphClientArbitrumSepolia;
                // } else if(network === 'avalanche-mainnet') {
                //     GraphClient = GraphClientAvalancheMainnet;
            } else {
                GraphClient = GraphClientMainnet;
                sfNetwork = 'mainnet';
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
