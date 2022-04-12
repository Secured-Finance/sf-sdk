import { BigNumber, Contract, Overrides, Signer } from 'ethers';
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
        return this.contract.getOrder(orderID);
    };

    getOrderFromTree = async (orderID: number | BigNumber) => {
        return this.contract.getOrderFromTree(orderID);
    };

    getLastOrderID = async () => {
        return this.contract.last_order_id();
    };

    getLendingMarketCurrency = async () => {
        return this.contract.MarketCcy();
    };

    getLendingMarketTerm = async () => {
        return this.contract.MarketTerm();
    };

    getMaker = async (orderID: number | BigNumber) => {
        return this.contract.getMaker(orderID);
    };

    getBorrowRate = async () => {
        return this.contract.getBorrowRate();
    };

    getLendRate = async () => {
        return this.contract.getLendRate();
    };

    getMidRate = async () => {
        return this.contract.getMidRate();
    };

    cancelOrder = async (orderID: number | BigNumber) => {
        return this.contract.cancelOrder(orderID);
    };

    makeOrder = async (
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber
    ) => {
        return this.contract.makeOrder(side, amount, rate);
    };

    takeOrder = async (
        side: number,
        orderID: number | BigNumber,
        amount: number | BigNumber
    ) => {
        return this.contract.takeOrder(side, orderID, amount);
    };

    matchOrders = async (
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber
    ) => {
        return this.contract.matchOrders(side, amount, rate);
    };

    order = async (
        side: number,
        amount: number | BigNumber,
        rate: number | BigNumber
    ) => {
        return this.contract.order(side, amount, rate);
    };
}

export default LendingMarket;
