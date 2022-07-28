export * from './base-contract';
export {
    CollateralVault,
    LendingMarket,
    CollateralAggregator,
    Loan,
    LendingMarketController,
    CurrencyController,
    CloseOutNetting,
    PaymentAggregator,
    ProductAddressResolver,
    MarkToMarket,
    TermStructure,
    CrosschainAddressResolver,
    SettlementEngine,
};

import CloseOutNetting from './close-out-netting';
import CollateralAggregator from './collateral-aggregator';
import CollateralVault from './collateral-vault';
import CrosschainAddressResolver from './crosschain-address-resolver';
import CurrencyController from './currency-controller';
import LendingMarket from './lending-market';
import LendingMarketController from './lending-market-controller';
import Loan from './loan';
import MarkToMarket from './mark-to-market';
import PaymentAggregator from './payment-aggregator';
import ProductAddressResolver from './product-address-resolver';
import SettlementEngine from './settlement-engine';
import TermStructure from './term-structure';

export const contracts: { [key: string]: unknown } = {
    closeOutNetting: CloseOutNetting,
    collateralAggregator: CollateralAggregator,
    collateralVault: CollateralVault,
    crosschainAddressResolver: CrosschainAddressResolver,
    currencyController: CurrencyController,
    loan: Loan,
    lendingMarketController: LendingMarketController,
    markToMarket: MarkToMarket,
    paymentAggregator: PaymentAggregator,
    productAddressResolver: ProductAddressResolver,
    settlementEngine: SettlementEngine,
    termStructure: TermStructure,
};
