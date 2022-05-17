import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    LendingMarketController as Contract,
    LendingMarketController__factory,
} from '../../types/ethers-contracts';
import { addresses } from '../lib/addresses';
import { MarketOrder } from '../utils/types';

export class LendingMarketController {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = LendingMarketController__factory.connect(
            addresses[network].lendingMarketController,
            signerOrProvider
        );
    }

    getBorrowRatesForCcy = async (ccy: string) => {
        return this.contract.getBorrowRatesForCcy(ccy);
    };

    getLendRatesForCcy = async (ccy: string) => {
        return this.contract.getLendRatesForCcy(ccy);
    };

    getMidRatesForCcy = async (ccy: string) => {
        return this.contract.getMidRatesForCcy(ccy);
    };

    getDiscountFactorsForCcy = async (ccy: string) => {
        return this.contract.getDiscountFactorsForCcy(ccy);
    };

    getSupportedTerms = async (ccy: string) => {
        return this.contract.getSupportedTerms(ccy);
    };

    deployLendingMarket = async (ccy: string, term: string) => {
        return this.contract.deployLendingMarket(ccy, term);
    };

    pauseLendingMarkets = async (ccy: string) => {
        return this.contract.pauseLendingMarkets(ccy);
    };

    unpauseLendingMarkets = async (ccy: string) => {
        return this.contract.unpauseLendingMarkets(ccy);
    };

    placeBulkOrders = async (orders: MarketOrder[]) => {
        return this.contract.placeBulkOrders(orders);
    };
}

export default LendingMarketController;
