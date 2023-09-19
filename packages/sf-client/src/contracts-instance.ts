import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    BaseContractStatic,
    contracts,
    CurrencyController,
    GenesisValueVault,
    LendingMarketController,
    LendingMarketReader,
    TokenFaucet,
    TokenVault,
} from './contracts';
import { LendingMarkets } from './lib/lending-markets';
import { NetworkName } from './utils';

export class ContractsInstance {
    protected currencyController: CurrencyController | null = null;
    protected lendingMarkets: LendingMarkets | null = null;
    protected lendingMarketController: LendingMarketController | null = null;
    protected lendingMarketReader: LendingMarketReader | null = null;
    protected tokenVault: TokenVault | null = null;
    protected genesisValueVault: GenesisValueVault | null = null;
    protected tokenFaucet: TokenFaucet | null = null;

    async getInstances(
        signerOrProvider: Signer | Provider,
        network: NetworkName
    ) {
        let key: keyof typeof contracts;
        for (key in contracts) {
            if (Object.prototype.hasOwnProperty.call(contracts, key)) {
                const Contract = contracts[key] as BaseContractStatic;
                this[key] = (await Contract.getInstance(
                    signerOrProvider,
                    network
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                )) as any;
            }
        }

        this.lendingMarkets = new LendingMarkets(signerOrProvider);
    }
}
