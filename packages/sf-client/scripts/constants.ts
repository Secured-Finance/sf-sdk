export const contractsList = [
    {
        name: 'CurrencyController',
        links: [],
    },
    {
        name: 'LendingMarketController',
        links: [
            'LendingMarketUserLogic',
            'FundManagementLogic',
            'DepositManagementLogic',
            'LendingMarket',
            'OrderActionLogic',
        ],
    },
    {
        name: 'LendingMarketReader',
        links: [],
    },
    {
        name: 'TokenFaucet',
        links: [],
    },
    {
        name: 'TokenVault',
        links: ['DepositManagementLogic'],
    },
    {
        name: 'GenesisValueVault',
        links: [],
    },
];
