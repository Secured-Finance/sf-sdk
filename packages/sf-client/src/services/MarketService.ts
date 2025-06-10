import { Currency } from '@secured-finance/sf-core';
import { PublicClient, WalletClient, Hex, stringToHex } from 'viem';
import { SecuredFinanceClientConfig } from '../entities';
import {
    getLendingMarketControllerContract,
    getLendingMarketReaderContract,
    getCurrencyControllerContract,
} from '../contracts';

export class MarketService {
    constructor(
        private config: SecuredFinanceClientConfig,
        private publicClient: PublicClient,
        private walletClient: WalletClient
    ) {}

    private convertCurrencyToBytes32(ccy: Currency) {
        return stringToHex(ccy.isNative ? ccy.symbol : ccy.wrapped.symbol, {
            size: 32,
        });
    }

    async getLastPrice(currency: Currency) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'getLastPrice',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    async getDecimals(currency: Currency) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'getDecimals',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    async isTerminated() {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'isTerminated',
        });
    }

    async getMarketTerminationDate() {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getTerminationDate',
        });
    }

    async getMarketTerminationRatio(currency: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getTerminationCollateralRatio',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    async getMarketTerminationPriceAndDecimals(currency: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getTerminationCurrencyCache',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    async isRedemptionRequired(account: string) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'isRedemptionRequired',
            args: [account as Hex],
        });
    }

    async executeEmergencySettlement() {
        const [address] = await this.walletClient.getAddresses();
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'executeEmergencySettlement',
        });
    }

    async getItayoseEstimation(currency: Currency, maturity: number) {
        const result = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getItayoseEstimation',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
        return {
            openingUnitPrice: result[0],
            lastLendUnitPrice: result[1],
            lastBorrowUnitPrice: result[2],
            totalOffsetAmount: result[3],
        };
    }

    async getGenesisValue(currency: Currency, account: string) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getGenesisValue',
            args: [this.convertCurrencyToBytes32(currency), account as Hex],
        });
    }
}
