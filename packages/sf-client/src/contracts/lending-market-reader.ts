import {
    Address,
    GetContractReturnType,
    PublicClient,
    WalletClient,
    getContract,
} from 'viem';
import { NetworkName, getContractEnvironment } from '../utils';
import {
    abi as developmentAbi,
    address as developmentAddress,
} from './../deployments/development/LendingMarketReader';
import {
    abi as stagingAbi,
    address as stagingAddress,
} from './../deployments/staging/LendingMarketReader';

export type LendingMarketReaderContractType = GetContractReturnType<
    typeof developmentAbi | typeof stagingAbi,
    PublicClient,
    WalletClient,
    Address
>;

export class LendingMarketReader {
    static async getInstance(
        networkName: NetworkName,
        publicClient: PublicClient,
        walletClient?: WalletClient
    ) {
        const devContract = getContract({
            abi: developmentAbi,
            address: developmentAddress,
            publicClient,
            walletClient,
        });

        const stagingContract = getContract({
            abi: stagingAbi,
            address: stagingAddress,
            publicClient,
            walletClient,
        });

        const contractEnv = getContractEnvironment(networkName);

        const contractToUse =
            contractEnv === 'development' ? devContract : stagingContract;

        return contractToUse;
    }
}

export default LendingMarketReader;
