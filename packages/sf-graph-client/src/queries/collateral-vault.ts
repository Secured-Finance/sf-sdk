import { gql } from '@apollo/client';

export const COLLATERAL_VAULTS = gql`
    query CollateralVaults($skip: Int!) {
        collateralVaults(skip: $skip) {
            id
            address
            tokenAddress
            currency {
                shortName
                name
            }
            collateralBooks {
                id
                address
                independentCollateral
                lockedCollateral
            }
            collateralPositions {
                address0
                address1
                packedAddresses
                lockedCollateral0
                lockedCollateral1
            }
        }
    }
`;

export const COLLATERAL_VAULT = gql`
    query CollateralVault($vaultId: Bytes!) {
        collateralVault(id: $id) {
            id
            address
            tokenAddress
            currency {
                shortName
                name
            }
            collateralBooks {
                id
                address
                independentCollateral
                lockedCollateral
            }
            collateralPositions {
                address0
                address1
                packedAddresses
                lockedCollateral0
                lockedCollateral1
            }
        }
    }
`;

export const COLLATERAL_BOOK_FROM_VAULT = gql`
    query CollateralVault($vaultId: Bytes!, $address: Bytes!) {
        collateralVault(id: $vaultId) {
            id
            address
            tokenAddress
            currency {
                shortName
                name
            }
            collateralBooks(
                filters: { address0: $address, or: { address1: $address } }
            ) {
                id
                address
                independentCollateral
                lockedCollateral
            }
        }
    }
`;

export const BILATERAL_POSITIONS_FROM_VAULT = gql`
    query CollateralVault($vaultId: Bytes!, $address: Bytes!) {
        collateralVault(id: $vaultId) {
            id
            address
            tokenAddress
            currency {
                shortName
                name
            }
            collateralPositions(
                filters: { address0: $address, or: { address1: $address } }
            ) {
                id
                address0
                address1
                packedAddresses
                lockedCollateral0
                lockedCollateral1
            }
        }
    }
`;

export const BILATERAL_POSITION_FROM_VAULT = gql`
    query CollateralVault($vaultId: Bytes!, $positionId: Bytes!) {
        collateralVault(id: $vaultId) {
            id
            address
            tokenAddress
            currency {
                shortName
                name
            }
            collateralPosition(id: $positionId) {
                id
                address0
                address1
                packedAddresses
                lockedCollateral0
                lockedCollateral1
            }
        }
    }
`;
