import { Contract, Signer} from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import LendingMarketControllerAbi from "../lib/abis/LendingMarketController";
import { TxBase } from '../utils/eth-tx';
import { addresses } from '../lib/addresses';
import { MarketOrder } from '../utils/types';

export class LendingMarketController {
    contract: Contract;
    
    constructor(signerOrProvider: Signer | BaseProvider, network: number) {
        this.contract = new Contract(
            addresses[network].lendingMarketController,
            LendingMarketControllerAbi,
            signerOrProvider,
          );
    }

    getBorrowRatesForCcy = async (ccy: string) => {
        return await this.contract.getBorrowRatesForCcy(ccy);
    }

    getLendRatesForCcy = async (ccy: string) => {
        return await this.contract.getLendRatesForCcy(ccy);
    }

    getMidRatesForCcy = async (ccy: string) => {
        return await this.contract.getMidRatesForCcy(ccy);
    }

    getDiscountFactorsForCcy = async (ccy: string) => {
        return await this.contract.getDiscountFactorsForCcy(ccy);
    }

    getSupportedTerms = async (ccy: string) => {
        return await this.contract.getSupportedTerms(ccy);
    }

    deployLendingMarket = async (ccy: string, term: string, txParams?: TxBase) => {
        return await this.contract.deployLendingMarket(ccy, term, txParams);
    }

    pauseLendingMarkets = async (ccy: string, txParams?: TxBase) => {
        return await this.contract.pauseLendingMarkets(ccy, txParams);
    }

    unpauseLendingMarkets = async (ccy: string, txParams?: TxBase) => {
        return await this.contract.unpauseLendingMarkets(ccy, txParams);
    }

    placeBulkOrders = async (orders: MarketOrder[], txParams?: TxBase) => {
        return await this.contract.placeBulkOrders(orders, txParams);
    }

}

export default LendingMarketController;