import { Provider } from '@ethersproject/providers';
import { BigNumber, Signer } from 'ethers';
import { LendingMarket as Contract, LendingMarket__factory } from '../types';
import { getLendingMarketByCcyAndTerm } from '../utils/addresses';

export class LendingMarket {
    contract: Contract;

    constructor(
        ccy: string,
        term: string,
        signerOrProvider: Signer | Provider,
        network: number
    ) {
        const marketAddress = getLendingMarketByCcyAndTerm(ccy, term, network);

        this.contract = LendingMarket__factory.connect(
            marketAddress.address,
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
