import { BigNumber, Contract, Signer } from 'ethers';
import CurrencyControllerAbi from '../lib/abis/CurrencyController';
import { addresses } from '../lib/addresses';
import { Provider } from '@ethersproject/providers';

export class CurrencyController {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].currencyController,
            CurrencyControllerAbi,
            signerOrProvider
        );
    }

    getCurrency = async (ccy: string) => {
        return this.contract.currencies(ccy);
    };

    getLTV = async (ccy: string) => {
        return this.contract.getLTV(ccy);
    };

    getMinMargin = async (ccy: string) => {
        return this.contract.getMinMargin(ccy);
    };

    isSupportedCcy = async (ccy: string) => {
        return this.contract.isSupportedCcy(ccy);
    };

    getLastUSDPrice = async (ccy: string) => {
        return this.contract.getLastUSDPrice(ccy);
    };

    getHistoricalUSDPrice = async (
        ccy: string,
        roundID: number | BigNumber
    ) => {
        return this.contract.getHistoricalUSDPrice(ccy, roundID);
    };

    getLastETHPrice = async (ccy: string) => {
        return this.contract.getLastETHPrice(ccy);
    };

    getHistoricalETHPrice = async (
        ccy: string,
        roundID: number | BigNumber
    ) => {
        return this.contract.getHistoricalETHPrice(ccy, roundID);
    };

    convertToETH = async (ccy: string, amount: number | BigNumber) => {
        return this.contract.convertToETH(ccy, amount);
    };

    convertFromETH = async (ccy: string, amount: number | BigNumber) => {
        return this.contract.convertFromETH(ccy, amount);
    };

    convertBulkToETH = async (ccy: string, amounts: number[] | BigNumber[]) => {
        return this.contract.convertBulkToETH(ccy, amounts);
    };
}

export default CurrencyController;
