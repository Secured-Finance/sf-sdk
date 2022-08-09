import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    BaseContractStatic,
    CloseOutNetting,
    CollateralAggregator,
    CollateralVault,
    contracts,
    CrosschainAddressResolver,
    CurrencyController,
    LendingMarketController,
    Loan,
    MarkToMarket,
    PaymentAggregator,
    ProductAddressResolver,
    SettlementEngine,
    TermStructure,
} from './contracts';
import { LendingMarkets, LENDING_MARKETS } from './lib/lending-markets';
import { NetworkName } from './utils';

export class ContractsInstance {
    protected lendingMarkets: LendingMarkets;
    protected collateralAggregator: CollateralAggregator;
    protected collateralVault: CollateralVault;
    protected loan: Loan;
    protected lendingMarketController: LendingMarketController;
    protected currencyController: CurrencyController;
    protected closeOutNetting: CloseOutNetting;
    protected paymentAggregator: PaymentAggregator;
    protected productAddressResolver: ProductAddressResolver;
    protected markToMarket: MarkToMarket;
    protected termStructure: TermStructure;
    protected crosschainAddressResolver: CrosschainAddressResolver;
    protected settlementEngine: SettlementEngine;

    async getInstances(
        signerOrProvider: Signer | Provider,
        network: NetworkName
    ) {
        for (const key in contracts) {
            if (Object.prototype.hasOwnProperty.call(contracts, key)) {
                const Contract = contracts[key] as BaseContractStatic;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this[key] = await Contract.getInstance(
                    signerOrProvider,
                    network
                );
            }
        }

        this.lendingMarkets = new LendingMarkets(
            LENDING_MARKETS,
            signerOrProvider,
            network
        );
    }
}
