export const NETWORKS: { [key: number]: string } = {
    1: 'mainnet',
    5: 'goerli',
    1337: 'localhost',
};

export const networkNames = ['goerli', 'mainnet'] as const;
export type NetworkName = (typeof networkNames)[number];
