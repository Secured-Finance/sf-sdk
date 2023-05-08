import * as DEV_QUERIES from './development/.graphclient';
import * as STAGING_QUERIES from './staging/.graphclient';

const getQueries = () => {
    let queries;
    switch (process.env.NODE_ENV) {
        case 'development':
            queries = DEV_QUERIES;
            break;
        case 'staging':
            queries = STAGING_QUERIES;
            break;
        default:
            queries = DEV_QUERIES;
            break;
    }
    return queries;
};

const queries = getQueries();

export default queries;
