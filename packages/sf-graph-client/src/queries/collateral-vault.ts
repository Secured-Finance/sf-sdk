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
        collateralVault(id: $vaultId) {
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
        collateralBooks(
            where: { vault_contains: $vaultId, address_contains: $address }
        ) {
            id
            address
            independentCollateral
            lockedCollateral
            currency {
                shortName
                name
            }
            vault {
                tokenAddress
                address
            }
        }
    }
`;

export const BILATERAL_POSITIONS_FROM_VAULT = gql`
    query CollateralVault($vaultId: Bytes!, $address: Bytes!) {
        collateralVaultPositions(
            where: { vault_contains: $vaultId, addresses_contains: $address }
        ) {
            id
            address0
            address1
            vault {
                tokenAddress
                address
            }
            packedAddresses
            lockedCollateral0
            lockedCollateral1
            currency {
                shortName
                name
                identifier
            }
        }
    }
`;

export const BILATERAL_POSITION_FROM_VAULT = gql`
    query CollateralVault($positionId: Bytes!) {
        collateralVaultPosition(id: $positionId) {
            id
            address0
            address1
            vault {
                tokenAddress
                address
            }
            packedAddresses
            lockedCollateral0
            lockedCollateral1
            currency {
                shortName
                name
                identifier
            }
        }
    }
`;
