import { BigNumber, BytesLike, Contract, Signer} from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import LendingMarketAbi from "../lib/abis/LendingMarket";
import { TxBase } from '../utils/eth-tx';
import { addresses } from '../lib/addresses';
import { getLendingMarketByCcyAndTerm } from '../utils/addresses';

export class LendingMarket {
    contract: Contract;
    
    constructor(
        ccy: string,
        term: string,
        signerOrProvider: Signer | BaseProvider, 
        network: number
    ) {
        let marketAddress = getLendingMarketByCcyAndTerm(ccy, term, network);
        console.log(marketAddress);

        this.contract = new Contract(
            marketAddress.address,
            LendingMarketAbi,
            signerOrProvider,
          );
    }

    getOrder = async (orderID: number | BigNumber) => {
        return await this.contract.getOrder(orderID);
    }

    getOrderFromTree = async (orderID: number | BigNumber) => {
        return await this.contract.getOrderFromTree(orderID);
    }

    getLastOrderID = async () => {
        return await this.contract.last_order_id();
    }

    getLendingMarketCurrency = async () => {
        return await this.contract.MarketCcy();
    }

    getLendingMarketTerm = async () => {
        return await this.contract.MarketTerm();
    }

    getMaker = async (orderID: number | BigNumber) => {
        return await this.contract.getMaker(orderID);
    }

    getBorrowRate = async () => {
        return await this.contract.getBorrowRate();
    }

    getLendRate = async () => {
        return await this.contract.getLendRate();
    }

    getMidRate = async () => {
        return await this.contract.getMidRate();
    }

    cancelOrder = async (orderID: number | BigNumber) => {
        return await this.contract.cancelOrder(orderID);
    }

    makeOrder = async (side: number, amount: number | BigNumber, rate: number | BigNumber) => {
        return await this.contract.makeOrder(side, amount, rate);
    }

    takeOrder = async (side: number, orderID: number | BigNumber, amount: number | BigNumber) => {
        return await this.contract.takeOrder(side, orderID, amount);
    }

    matchOrders = async (side: number, amount: number | BigNumber, rate: number | BigNumber) => {
        return await this.contract.matchOrders(side, amount, rate);
    }

    order = async (side: number, amount: number | BigNumber, rate: number | BigNumber) => {
        return await this.contract.order(side, amount, rate);
    }

}

export default LendingMarket;