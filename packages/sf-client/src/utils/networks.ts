export const NETWORKS: { [key: number]: string } = {
    1: 'mainnet',
    3: 'ropsten',
    4: 'rinkeby',
    1337: 'localhost',
};

export const networkNames = ['rinkeby', 'mainnet'] as const;
export type NetworkName = typeof networkNames[number];
