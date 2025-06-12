import { Currency } from '@secured-finance/sf-core';
import { PublicClient, WalletClient, Hex, stringToHex } from 'viem';
import { SecuredFinanceClientConfig } from '../entities';
import { TokenVault } from '../contracts/TokenVault';
import {
    getLendingMarketControllerContract,
    getLendingMarketReaderContract,
} from '../contracts';

export class PositionService {
    constructor(
        private config: SecuredFinanceClientConfig,
        private publicClient: PublicClient,
        private walletClient: WalletClient,
        private tokenVault: TokenVault
    ) {}

    private convertCurrencyToBytes32(ccy: Currency) {
        return stringToHex(ccy.isNative ? ccy.symbol : ccy.wrapped.symbol, {
            size: 32,
        });
    }

    async getPositions(account: string, usedCurrenciesForOrders: Currency[]) {
        return this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getPositions',
            args: [
                usedCurrenciesForOrders.map(ccy =>
                    this.convertCurrencyToBytes32(ccy)
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
        const [address] = await this.walletClient.getAddresses();
        const contract = getLendingMarketControllerContract(this.config.env);
        const estimatedGas = await this.publicClient.estimateContractGas({
            ...contract,
            account: address,
            functionName: 'unwindPosition',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
        return this.walletClient.writeContract({
            ...contract,
            account: address,
            chain: this.config.chain,
            functionName: 'unwindPosition',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
            gas: (estimatedGas * 11n) / 10n,
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
        const [address] = await this.walletClient.getAddresses();
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'executeRepayment',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
    }

    async executeRedemption(currency: Currency, maturity: number) {
        const [address] = await this.walletClient.getAddresses();
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
        const [address] = await this.walletClient.getAddresses();
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
            gas: (estimatedGas * 11n) / 10n,
        });
    }
}
