import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    BaseContractStatic,
    CollateralAggregator,
    CollateralVault,
    contracts,
    CurrencyController,
    LendingMarketController,
} from './contracts';
import { LendingMarkets } from './lib/lending-markets';
import { NetworkName } from './utils';

export class ContractsInstance {
    protected lendingMarkets: LendingMarkets | null = null;
    protected collateralAggregator: CollateralAggregator | null = null;
    protected collateralVault: CollateralVault | null = null;
    protected lendingMarketController: LendingMarketController | null = null;
    protected currencyController: CurrencyController | null = null;

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

        this.lendingMarkets = new LendingMarkets(signerOrProvider, network);
    }
}
