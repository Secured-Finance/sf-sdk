import { COLLATERAL_BOOK_FROM_VAULT, BILATERAL_POSITIONS_FROM_VAULT } from "../queries";

export const collateralVaultQueriesMock = [
    {
        request: {
            query: COLLATERAL_BOOK_FROM_VAULT,
            variables: {
                vaultId: '0xETH',
                address: '0x01',
            },
        },
        result: {
            data: {
                collateralVault: {
                    id: '',
                    address: '0x01212',
                    tokenAddress: '0x00000467',
                    currency: {
                        shortName: 'ETH',
                        name: "Ethereum"
                    },
                    collateralBooks: [{
                        id: '',
                        address: '0x01',
                        independentCollateral: 1000,
                        lockedCollateral: 5000,
                    }]
                },
            },
        },
    },
    {
        request: {
          query: COLLATERAL_BOOK_FROM_VAULT,
          variables: {
            vaultId: '0xWETH',
            address: '0x01',
          },
        },
        error: new Error('Network error'),
    },
    {
        request: {
            query: BILATERAL_POSITIONS_FROM_VAULT,
            variables: {
                vaultId: '0xETH',
                address: '0x01',
            },
        },
        result: {
            data: {
                collateralVault: {
                    id: '',
                    address: '0x01212',
                    tokenAddress: '0x00000467',
                    currency: {
                        shortName: 'ETH',
                        name: "Ethereum"
                    },
                    collateralPositions: [{
                        id: '',
                        address0: '0x010012',
                        address1: '0x01',
                        packedAddresses: '0x002141012',
                        lockedCollateral0: 10000,
                        lockedCollateral1: 50000,
                    }]
                },
            },
        },
    },
    {
        request: {
          query: BILATERAL_POSITIONS_FROM_VAULT,
          variables: {
            vaultId: '0xWETH',
            address: '0x01',
          },
        },
        error: new Error('Network error'),
    },
];
