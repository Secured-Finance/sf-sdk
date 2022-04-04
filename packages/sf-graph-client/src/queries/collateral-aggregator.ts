import { gql } from '@apollo/client';

export const COLLATERAL_AGGREGATOR = gql`
    query CollateralAggregator($first: Int!) {
        collateralAggregators(first: $first) {
            id
            address
            liquidationPrice
            marginCall
            autoLiquidation
            minCollateralRequirements
        }
    }
`;

export const BILATERAL_POSITIONS = gql`
    query BilateralPositions($address: Bytes!) {
        bilateralPositions(where: { addresses_contains: $address }) {
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
`;

export const UNSETTLED_POSITIONS = gql`
    query UnsettledPositions($address: Bytes!) {
        collateralPositions(where: { address: $address }) {
            id
            address
            collateralPositions {
                unsettledPV
                currencyIdentifier
                currency {
                    shortName
                    name
                }
            }
        }
    }
`;
