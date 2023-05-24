export const NETWORKS: { [key: number]: string } = {
    1: 'mainnet',
    11155111: 'sepolia',
    1337: 'localhost',
};

export const networkNames = ['sepolia', 'mainnet'] as const;
export type NetworkName = (typeof networkNames)[number];
