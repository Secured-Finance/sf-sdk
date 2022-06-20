import { CURRENCY } from '../queries';

export const currencyQueriesMock = [
    {
        request: {
            query: CURRENCY,
            variables: {
                currency: '0xETH',
            },
        },
        result: {
            data: {
                currency: {
                    id: '',
                    identifier: '0x',
                    name: 'Ethereum',
                    shortName: 'ETH',
                    chainId: 417,
                    ltv: 7500,
                    minMargin: 2500,
                    isSupported: true,
                    isCollateral: true,
                    terms: [
                        {
                            daysNum: 90,
                            dfFrac: 2500,
                            paymentNum: 1,
                        },
                    ],
                },
            },
        },
    },
    {
        request: {
            query: CURRENCY,
            variables: {
                currency: '0xWETH',
            },
        },
        error: new Error('Network error'),
    },
];
