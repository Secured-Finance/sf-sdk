import * as DEV_QUERIES from './development/.graphclient';
import * as STAGING_QUERIES from './staging/.graphclient';

let queries:
    | typeof import('./development/.graphclient')
    | typeof import('./staging/.graphclient') = DEV_QUERIES;

switch (process.env.NODE_ENV) {
    case 'development':
        queries = DEV_QUERIES;
        break;
    case 'staging':
        queries = STAGING_QUERIES;
        break;
    default:
        break;
}

export default queries;
