# Secured Finance Subgraph

## Introduction

Secured Finance is an institutional-grade financial transaction platform with automatic collateral management and mark-to-market mechanisms.

This subgraph tracks of the current state of Secured Finance Protocol smart contracts, and provides historical data about activity for Secured Finance DApp.

* Lending contracts state and history with active and closed positions,
* Order-book market data for Secured Finance terminal,
* Secured Finance users collateral state
* Historical data from Secured Finance aggregated by days, hours, minutes, etc.

## Quick start

Follow the steps bellow to start the subgraph on a local machine

* Clone the graph node from this [repository](https://github.com/graphprotocol/graph-node)
* Run the docker container by executing `docker compose up` in the docker/ folder
* Start local ethereum network using [Ganache] (https://github.com/trufflesuite/ganache)
* Deploy the Secured Finance Protocol [protocol](https://github.com/Secured-Finance/smart-contracts) localy by running deployment script or integation test
* Run `yarn run create-local` to create a local subgraph on the graph node 
* Run `yarn run deploy-local` to deploy the subgraph on the local graph node

After following steps above you should be able to access GraphQL client for testing on this [link](http://127.0.0.1:8000/subgraphs/name/bahadylbekov/secured-finance-protocol)

## License

This project is licensed under the MIT license, Copyright (c) 2021 Secured Finance. For more information see LICENSE.
