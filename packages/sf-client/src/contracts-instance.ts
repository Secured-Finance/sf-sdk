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
