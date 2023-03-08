import * as DEV_QUERIES from './development';
import * as STAGING_QUERIES from './staging';

type Queries = typeof DEV_QUERIES;
export let LENDING_MARKETS: Queries['LENDING_MARKETS'];
export let USER_COUNT: Queries['USER_COUNT'];
export let DAILY_VOLUMES: Queries['DAILY_VOLUMES'];
export let USER_HISTORY: Queries['USER_HISTORY'];
export let TRADES: Queries['TRADES'];

switch (process.env.NODE_ENV) {
    case 'development':
        LENDING_MARKETS = DEV_QUERIES.LENDING_MARKETS;
        USER_COUNT = DEV_QUERIES.USER_COUNT;
        DAILY_VOLUMES = DEV_QUERIES.DAILY_VOLUMES;
        USER_HISTORY = DEV_QUERIES.USER_HISTORY;
        TRADES = DEV_QUERIES.TRADES;
        break;
    case 'staging':
        LENDING_MARKETS = STAGING_QUERIES.LENDING_MARKETS;
        USER_COUNT = STAGING_QUERIES.USER_COUNT;
        DAILY_VOLUMES = STAGING_QUERIES.DAILY_VOLUMES;
        USER_HISTORY = STAGING_QUERIES.USER_HISTORY;
        TRADES = STAGING_QUERIES.TRADES;
        break;
    default:
        break;
}
