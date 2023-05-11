import * as DEV_QUERIES from './development/.graphclient';
import * as STAGING_QUERIES from './staging/.graphclient';

// TODO: add typeof PROD_QUERIES to queries also
let queries: typeof DEV_QUERIES | typeof STAGING_QUERIES;

switch (process.env.SF_ENV) {
    case 'development':
        queries = DEV_QUERIES;
        break;
    case 'staging':
        queries = STAGING_QUERIES;
        break;
    case 'production':
    default:
        // TODO: queries need to be set for production once ready
        queries = DEV_QUERIES;
        break;
}

export default queries;
