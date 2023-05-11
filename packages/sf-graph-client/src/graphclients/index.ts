import * as DEV_QUERIES from './development/.graphclient';
import * as STAGING_QUERIES from './staging/.graphclient';

const getQueries = () => {
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
            // TODO: set the queries to Prod Queries for production
            break;
    }
    return queries;
};

const queries = getQueries();

export default queries;
