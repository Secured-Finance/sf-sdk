import CollateralVault from "./CollateralVault";
import LendingMarket from "./LendingMarket";
import Loan from "./Loan";
import CollateralAggregator from "./CollateralAggregator";

export {
    CollateralVault,
    LendingMarket,
    CollateralAggregator,
    Loan,
    
}

export const contracts: {[key: string]: any} = {
    'CollateralAggregator': CollateralAggregator,
    'Loan': Loan,
}