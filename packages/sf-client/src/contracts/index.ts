import CloseOutNetting from './CloseOutNetting';
import CollateralAggregator from './CollateralAggregator';
import CollateralVault from './CollateralVault';
import CrosschainAddressResolver from './CrosschainAddressResolver';
import CurrencyController from './CurrencyController';
import LendingMarket from './LendingMarket';
import LendingMarketController from './LendingMarketController';
import Loan from './Loan';
import MarkToMarket from './MarkToMarket';
import PaymentAggregator from './PaymentAggregator';
import ProductAddressResolver from './ProductAddressResolver';
import SettlementEngine from './SettlementEngine';
import TermStructure from './TermStructure';

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
