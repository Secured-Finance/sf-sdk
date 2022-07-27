import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
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

export class ContractsInstance {
    lendingMarkets: LendingMarkets;
    collateralAggregator: CollateralAggregator;
    collateralVault: CollateralVault;
    loan: Loan;
    lendingMarketController: LendingMarketController;
    currencyController: CurrencyController;
    closeOutNetting: CloseOutNetting;
    paymentAggregator: PaymentAggregator;
    productAddressResolver: ProductAddressResolver;
    markToMarket: MarkToMarket;
    termStructure: TermStructure;
    crosschainAddressResolver: CrosschainAddressResolver;
    settlementEngine: SettlementEngine;

    async getInstances(signerOrProvider: Signer | Provider, network: string) {
        const contractForEnv = contracts;

        for (const key in contractForEnv) {
            if (Object.prototype.hasOwnProperty.call(contractForEnv, key)) {
                const Contract = contractForEnv[key];
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
