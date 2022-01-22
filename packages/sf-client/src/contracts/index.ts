import CollateralVault from "./CollateralVault";
import LendingMarket from "./LendingMarket";
import Loan from "./Loan";
import CollateralAggregator from "./CollateralAggregator";
import LendingMarketController from "./LendingMarketController";
import CurrencyController from "./CurrencyController";
import CloseOutNetting from "./CloseOutNetting";
import PaymentAggregator from "./PaymentAggregator";
import ProductAddressResolver from "./ProductAddressResolver";
import MarkToMarket from "./MarkToMarket";
import TermStructure from "./TermStructure";

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
}

export const contracts: {[key: string]: any} = {
    'CollateralAggregator': CollateralAggregator,
    'Loan': Loan,
    'LendingMarketController': LendingMarketController,
    'CurrencyController': CurrencyController,
    'CloseOutNetting': CloseOutNetting,
    'PaymentAggregator': PaymentAggregator,
    'ProductAddressResolver': ProductAddressResolver,
    'MarkToMarket': MarkToMarket,
    'TermStructure': TermStructure,
}