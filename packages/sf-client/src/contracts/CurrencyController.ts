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
        return await this.contract.currencies(ccy);
    };

    getLTV = async (ccy: string) => {
        return await this.contract.getLTV(ccy);
    };

    getMinMargin = async (ccy: string) => {
        return await this.contract.getMinMargin(ccy);
    };

    isSupportedCcy = async (ccy: string) => {
        return await this.contract.isSupportedCcy(ccy);
    };

    getLastUSDPrice = async (ccy: string) => {
        return await this.contract.getLastUSDPrice(ccy);
    };

    getHistoricalUSDPrice = async (
        ccy: string,
        roundID: number | BigNumber
    ) => {
        return await this.contract.getHistoricalUSDPrice(ccy, roundID);
    };

    getLastETHPrice = async (ccy: string) => {
        return await this.contract.getLastETHPrice(ccy);
    };

    getHistoricalETHPrice = async (
        ccy: string,
        roundID: number | BigNumber
    ) => {
        return await this.contract.getHistoricalETHPrice(ccy, roundID);
    };

    convertToETH = async (ccy: string, amount: number | BigNumber) => {
        return await this.contract.convertToETH(ccy, amount);
    };

    convertFromETH = async (ccy: string, amount: number | BigNumber) => {
        return await this.contract.convertFromETH(ccy, amount);
    };

    convertBulkToETH = async (ccy: string, amounts: number[] | BigNumber[]) => {
        return await this.contract.convertBulkToETH(ccy, amounts);
    };
}

export default CurrencyController;
