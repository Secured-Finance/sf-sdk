import { Currency } from '@secured-finance/sf-core';
import {
    getLendingMarketControllerContract,
    getLendingMarketReaderContract,
    getCurrencyControllerContract,
    getGenesisValueVaultContract,
} from '../contracts';
import { BaseService, BaseServiceConfig } from './BaseService';
import { Hex } from 'viem';

export class MarketService extends BaseService {
    constructor(config: BaseServiceConfig) {
        super(config);
    }

    public getAdjustedGas(amount: bigint): bigint {
        return this.calculateAdjustedGas(amount);
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
        if (!this.walletClient) {
            throw new Error('Wallet client is required for this operation');
        }
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

    async getLatestAutoRollLog(currency: Currency) {
        return this.publicClient.readContract({
            ...getGenesisValueVaultContract(this.config.env),
            functionName: 'getLatestAutoRollLog',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    async getAutoRollLog(currency: Currency, maturity: number) {
        return this.publicClient.readContract({
            ...getGenesisValueVaultContract(this.config.env),
            functionName: 'getAutoRollLog',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
    }

    async calculateFVFromGV(
        currency: Currency,
        maturity: number,
        amount: bigint
    ) {
        return this.publicClient.readContract({
            ...getGenesisValueVaultContract(this.config.env),
            functionName: 'calculateFVFromGV',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                amount,
            ],
        });
    }
}
