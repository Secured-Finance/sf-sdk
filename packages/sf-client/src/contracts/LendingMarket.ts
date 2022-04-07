import { BigNumber, Contract, Signer } from 'ethers';
import LendingMarketAbi from '../lib/abis/LendingMarket';
import { TxBase } from '../utils/eth-tx';
import { getLendingMarketByCcyAndTerm } from '../utils/addresses';
import { Provider } from '@ethersproject/providers';

export class LendingMarket {
    contract: Contract;

    constructor(
        ccy: string,
        term: string,
        signerOrProvider: Signer | Provider,
        network: number
    ) {
        let marketAddress = getLendingMarketByCcyAndTerm(ccy, term, network);

        this.contract = new Contract(
            marketAddress.address,
            LendingMarketAbi,
            signerOrProvider
        );
    }

    getOrder = async (orderID: number | BigNumber) => {
        return await this.contract.getOrder(orderID);
    };

    getOrderFromTree = async (orderID: number | BigNumber) => {
        return await this.contract.getOrderFromTree(orderID);
    };

    getLastOrderID = async () => {
        return await this.contract.last_order_id();
    };

    getLendingMarketCurrency = async () => {
        return await this.contract.MarketCcy();
    };

    getLendingMarketTerm = async () => {
        return await this.contract.MarketTerm();
    };

    getMaker = async (orderID: number | BigNumber) => {
        return await this.contract.getMaker(orderID);
    };

    getBorrowRate = async () => {
        return await this.contract.getBorrowRate();
    };

    getLendRate = async () => {
        return await this.contract.getLendRate();
    };

    getMidRate = async () => {
        return await this.contract.getMidRate();
    };

    cancelOrder = async (orderID: number | BigNumber, txParams?: TxBase) => {
        return await this.contract.cancelOrder(orderID);
    };

    makeOrder = async (
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber,
        txParams?: TxBase
    ) => {
        return await this.contract.makeOrder(side, amount, rate, txParams);
    };

    takeOrder = async (
        side: number,
        orderID: number | BigNumber,
        amount: number | BigNumber,
        txParams?: TxBase
    ) => {
        return await this.contract.takeOrder(side, orderID, amount, txParams);
    };

    matchOrders = async (
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber
    ) => {
        return await this.contract.matchOrders(side, amount, rate);
    };

    order = async (
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber,
        txParams?: TxBase
    ) => {
        return await this.contract.order(side, amount, rate, txParams);
    };
}

export default LendingMarket;
