import CollateralVault from './CollateralVault';
import LendingMarket from './LendingMarket';
import Loan from './Loan';
import CollateralAggregator from './CollateralAggregator';
import LendingMarketController from './LendingMarketController';
import CurrencyController from './CurrencyController';
import CloseOutNetting from './CloseOutNetting';
import PaymentAggregator from './PaymentAggregator';
import ProductAddressResolver from './ProductAddressResolver';
import MarkToMarket from './MarkToMarket';
import TermStructure from './TermStructure';
import CrosschainAddressResolver from './CrosschainAddressResolver';

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
};

export const contracts: { [key: string]: any } = {
    collateralAggregator: CollateralAggregator,
    loan: Loan,
    lendingMarketController: LendingMarketController,
    currencyController: CurrencyController,
    closeOutNetting: CloseOutNetting,
    paymentAggregator: PaymentAggregator,
    productAddressResolver: ProductAddressResolver,
    markToMarket: MarkToMarket,
    termStructure: TermStructure,
    crosschainAddressResolver: CrosschainAddressResolver,
};
