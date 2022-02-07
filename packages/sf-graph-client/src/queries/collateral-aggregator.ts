import { gql } from "@apollo/client";

export const COLLATERAL_AGGREGATOR = gql`
    query CollateralAggregator($id: Bytes!) {
        collateralAggregator (id: $id) {
            id
            address
            liquidationPrice
            marginCall
            autoLiquidation
            minCollateralRequirements
    }
`

export const BILATERAL_POSITIONS_FROM_COLLATERAL_AGGREGATOR = gql`
    query BilateralPositionsFromAggregator($id: Bytes!) {
        collateralAggregator (id: $id) {
            bilateralPositions (filters: { address0: $address, or: { address1: $address }}) {
                id
                address0
                address1
                collateralNettings {
                    unsettled0PV
                    unsettled1PV
                    party0PV
                    party1PV
                    netPV
                    currency {
                        shortName
                        name
                    }
                }
            }
    }
`

export const UNSETTLED_POSITIONS_FROM_COLLATERAL_AGGREGATOR = gql`
    query UnsettledPositionsFromAggregator($id: Bytes!, $address: Bytes!) {
        collateralAggregator (id: $id) {
            collateralPositions (where: { address: $address }) {
                id
                address
                unsettledPV
                currency {
                    shortName
                    name
                }
            }
    }
`