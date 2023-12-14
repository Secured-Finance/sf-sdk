import * as DEV_QUERIES from './development/.graphclient';
import * as STAGING_QUERIES from './staging/.graphclient';
import * as PROD_SEPOLIA_QUERIES from './production/sepolia/.graphclient';
import * as PROD_MAINNET_QUERIES from './production/mainnet/.graphclient';

let queries:
    | typeof DEV_QUERIES
    | typeof STAGING_QUERIES
    | typeof PROD_SEPOLIA_QUERIES
    | typeof PROD_MAINNET_QUERIES;

switch (process.env.SF_ENV) {
    case 'development':
        queries = DEV_QUERIES;
        break;
    case 'staging':
        queries = STAGING_QUERIES;
        break;
    case 'production':
        switch (process.env.SF_NETWORK) {
            case 'sepolia':
                queries = PROD_SEPOLIA_QUERIES;
                break;
            case 'mainnet':
            default:
                queries = PROD_MAINNET_QUERIES;
                break;
        }
        break;
    default:
        queries = PROD_MAINNET_QUERIES;
        break;
}

export default queries;
