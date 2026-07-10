import { Currency } from '@secured-finance/sf-core';
import { Hex } from 'viem';
import {
    getLendingMarketControllerContract,
    getLendingMarketReaderContract,
} from '../contracts';
import { BaseService, BaseServiceConfig } from './BaseService';

export class PositionService extends BaseService {
    constructor(config: BaseServiceConfig) {
        super(config);
    }

    async getPositions(account: string, usedCurrenciesForOrders: Currency[]) {
        return this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getPositions',
            args: [
                this.convertCurrencyArrayToBytes32Array(
                    usedCurrenciesForOrders
                ),
                account as Hex,
            ],
        });
    }

    async getUsedCurrenciesForOrders(account: string) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getUsedCurrencies',
            args: [account as Hex],
        });
    }

    async unwindPosition(currency: Currency, maturity: number) {
        const address = await this.getWalletAddress();
        const contract = getLendingMarketControllerContract(this.config.env);
        const estimatedGas = await this.publicClient.estimateContractGas({
            ...contract,
            account: address,
            functionName: 'unwindPosition',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
        if (!this.walletClient) {
            throw new Error('Wallet client is required for this operation');
        }
        return this.walletClient.writeContract({
            ...contract,
            account: address,
            chain: this.config.chain,
            functionName: 'unwindPosition',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
            gas: this.calculateAdjustedGas(estimatedGas),
        });
    }

    async getTotalPresentValueInBaseCurrency(account: string) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getTotalPresentValueInBaseCurrency',
            args: [account as Hex],
        });
    }

    async executeRepayment(currency: Currency, maturity: number) {
        const address = await this.getWalletAddress();
        if (!this.walletClient) {
            throw new Error('Wallet client is required for this operation');
        }
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'executeRepayment',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
    }

    async executeRedemption(currency: Currency, maturity: number) {
        const address = await this.getWalletAddress();
        if (!this.walletClient) {
            throw new Error('Wallet client is required for this operation');
        }
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'executeRedemption',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
    }

    async executeLiquidationCall(
        collateralCcy: Currency,
        debtCcy: Currency,
        debtMaturity: number,
        account: string
    ) {
        const address = await this.getWalletAddress();
        const contract = getLendingMarketControllerContract(this.config.env);
        const estimatedGas = await this.publicClient.estimateContractGas({
            ...contract,
            account: address,
            functionName: 'executeLiquidationCall',
            args: [
                this.convertCurrencyToBytes32(collateralCcy),
                this.convertCurrencyToBytes32(debtCcy),
                BigInt(debtMaturity),
                account as Hex,
            ],
        });
        if (!this.walletClient) {
            throw new Error('Wallet client is required for this operation');
        }
        return this.walletClient.writeContract({
            ...contract,
            account: address,
            chain: this.config.chain,
            functionName: 'executeLiquidationCall',
            args: [
                this.convertCurrencyToBytes32(collateralCcy),
                this.convertCurrencyToBytes32(debtCcy),
                BigInt(debtMaturity),
                account as Hex,
            ],
            gas: this.calculateAdjustedGas(estimatedGas),
        });
    }
}
