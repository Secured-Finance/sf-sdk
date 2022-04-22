# Chainlink External Adapter

## Description

This repo contains the Chainlink External Adapter for [smart contracts](https://github.com/secured-finance/smart-contracts) of Secured Finance

## Installation

```bash
$ nvm use
$ npm install
$ cp .env.sample .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

See [Chainlink Node README](./chainlink-node/README.md) in case of running with Chainlink Node in your local environment.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
