import * as DEV_QUERIES from './development/.graphclient';
import * as STAGING_QUERIES from './staging/.graphclient';
import * as PROD_MAINNET_QUERIES from './mainnet/.graphclient';

let queries: typeof DEV_QUERIES;

switch (process.env.SF_ENV) {
    case 'development':
        queries = DEV_QUERIES;
        break;
    case 'staging':
        queries = STAGING_QUERIES as unknown as typeof DEV_QUERIES;
        break;
    // TODO: different queries for different networks need to be set
    case 'production':
    default:
        queries = PROD_MAINNET_QUERIES as unknown as typeof DEV_QUERIES;
        break;
}

export default queries;
