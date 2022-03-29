import {
    UNSETTLED_POSITIONS_FROM_COLLATERAL_AGGREGATOR,
    BILATERAL_POSITIONS_FROM_COLLATERAL_AGGREGATOR,
} from '../queries';

export const collateralAggregatorQueriesMock = [
    {
        request: {
            query: UNSETTLED_POSITIONS_FROM_COLLATERAL_AGGREGATOR,
            variables: {
                id: '0x000111',
                address: '0x01',
            },
        },
        result: {
            data: {
                collateralAggregator: {
                    collateralPositions: [
                        {
                            id: '',
                            address: '0x01',
                            unsettledPV: 5500,
                            currency: {
                                shortName: 'ETH',
                                name: 'Ethereum',
                            },
                        },
                    ],
                },
            },
        },
    },
    {
        request: {
            query: UNSETTLED_POSITIONS_FROM_COLLATERAL_AGGREGATOR,
            variables: {
                id: '0x000111',
                address: '0x012',
            },
        },
        error: new Error('Network error'),
    },
    {
        request: {
            query: BILATERAL_POSITIONS_FROM_COLLATERAL_AGGREGATOR,
            variables: {
                id: '0x000111',
                address: '0x01',
            },
        },
        result: {
            data: {
                collateralAggregator: {
                    bilateralPositions: [
                        {
                            id: '',
                            address0: '0x010012',
                            address1: '0x01',
                            collateralNettings: [
                                {
                                    unsettled0PV: 1500,
                                    unsettled1PV: 1250,
                                    party0PV: 5500,
                                    party1PV: 1000,
                                    netPV: 4500,
                                    currency: {
                                        shortName: 'ETH',
                                        name: 'Ethereum',
                                    },
                                },
                            ],
                        },
                    ],
                },
            },
        },
    },
    {
        request: {
            query: BILATERAL_POSITIONS_FROM_COLLATERAL_AGGREGATOR,
            variables: {
                id: '0x000111',
                address: '0x012',
            },
        },
        error: new Error('Network error'),
    },
];
