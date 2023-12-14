import * as DEV_QUERIES from './development/.graphclient';
import * as STAGING_QUERIES from './staging/.graphclient';
import * as PROD_QUERIES from './production/mainnet/.graphclient';

let queries: typeof DEV_QUERIES | typeof STAGING_QUERIES | typeof PROD_QUERIES;

switch (process.env.SF_ENV) {
    case 'development':
        queries = DEV_QUERIES;
        break;
    case 'staging':
        queries = STAGING_QUERIES;
        break;
    case 'production':
    default:
        queries = PROD_QUERIES;
        break;
}

export default queries;
