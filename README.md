# Secured Finance - JavaScript SDK

## Packages

| Package                                                               | Status                                                                                                                                               | Description                          |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [`@secured-finance/sf-client`](/packages/sf-client)   || Client library for the Secured Finance protocol        |
| [`@secured-finance/sf-graph-client`](/packages/sf-graph-client)   || GraphQL library for querying data from SF subgraph        |
| [`@secured-finance/sf-core`](/packages/sf-core)   || Core components used in different Secured Finance projects        |

## Using packages

To install all npm dependencies, and prepare monorepo packages run:

```
nvm use
npm install
npm run bootstrap
```

### Building

To build updated packages, run:

```
npm run build-all
```

This will compile and build all packages inside the monorepo. To build individual package please run the same command from an individual repository

Make sure you fix formatting of the code before merging it to the main branches by running:
```
npm run format:fix
```

# License

This project is licensed under the MIT license, Copyright (c) 2022 Secured Finance. For more information see `LICENSE.md`.
