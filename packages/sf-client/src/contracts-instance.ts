import { PublicClient, WalletClient } from 'viem';
import {
    CurrencyController,
    CurrencyControllerContractType,
    GenesisValueVault,
    GenesisValueVaultContractType,
    LendingMarketController,
    LendingMarketControllerContractType,
    LendingMarketReader,
    LendingMarketReaderContractType,
    TokenFaucet,
    TokenFaucetContractType,
    TokenVault,
    TokenVaultContractType,
} from './contracts';
import { NetworkName } from './utils';

export class ContractsInstance {
    protected currencyController: CurrencyControllerContractType | undefined;
    protected lendingMarketController:
        | LendingMarketControllerContractType
        | undefined;
    protected lendingMarketReader: LendingMarketReaderContractType | undefined;
    protected tokenVault: TokenVaultContractType | undefined;
    protected genesisValueVault: GenesisValueVaultContractType | undefined;
    protected tokenFaucet: TokenFaucetContractType | undefined;

    async getInstances(
        network: NetworkName,
        publicClient: PublicClient,
        walletClient?: WalletClient
    ) {
        this.currencyController = await CurrencyController.getInstance(
            network,
            publicClient,
            walletClient
        );
        this.lendingMarketController =
            await LendingMarketController.getInstance(
                network,
                publicClient,
                walletClient
            );
        this.lendingMarketReader = await LendingMarketReader.getInstance(
            network,
            publicClient,
            walletClient
        );
        this.tokenVault = await TokenVault.getInstance(
            network,
            publicClient,
            walletClient
        );
        this.genesisValueVault = await GenesisValueVault.getInstance(
            network,
            publicClient,
            walletClient
        );
        this.tokenFaucet = await TokenFaucet.getInstance(
            network,
            publicClient,
            walletClient
        );
    }
}
