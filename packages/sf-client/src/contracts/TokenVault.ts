import { Currency } from '@secured-finance/sf-core';
import { Hex } from 'viem';
import { tokenVaultDevContract, tokenVaultStgContract } from '../contracts';
import { BaseContract } from './BaseContract';

export class TokenVault extends BaseContract {
    private getContract() {
        switch (this.config.env) {
            case 'development':
                return tokenVaultDevContract;
            default:
            case 'staging':
                return tokenVaultStgContract;
        }
    }

    /**
     * Retrieves the token address for the specified currency.
     * @param currency The currency for which to retrieve the token address.
     * @returns A Promise that resolves to the token address.
     */
    async getTokenAddress(currency: Currency) {
        return this.publicClient.readContract({
            ...this.getContract(),
            functionName: 'getTokenAddress',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    /**
     * Retrieves the collateral parameters from the token vault contract.
     * The collateral parameters include the liquidation threshold rate, liquidation protocol fee rate, and liquidator fee rate.
     * @returns An object containing the liquidation threshold rate, liquidation protocol fee rate, and liquidator fee rate.
     */
    async getCollateralParameters() {
        const result = await this.publicClient.readContract({
            ...this.getContract(),
            functionName: 'getLiquidationConfiguration',
        });

        return {
            liquidationThresholdRate: result[0],
            liquidationProtocolFeeRate: result[1],
            liquidatorFeeRate: result[2],
        };
    }

    /**
     * Retrieves the withdrawable collateral for a given currency and account.
     *
     * @param ccy - The currency for which to retrieve the withdrawable collateral.
     * @param account - The account for which to retrieve the withdrawable collateral.
     * @returns A Promise that resolves to the withdrawable collateral amount.
     */
    async getWithdrawableCollateral(ccy: Currency, account: string) {
        return this.publicClient.readContract({
            ...this.getContract(),
            functionName: 'getWithdrawableCollateral',
            args: [this.convertCurrencyToBytes32(ccy), account as Hex],
        });
    }

    /**
     * Withdraws collateral from the token vault.
     *
     * @param ccy - The currency of the collateral.
     * @param amount - The amount of collateral to withdraw.
     * @returns A promise that resolves when the withdrawal is successful.
     */
    async withdrawCollateral(ccy: Currency, amount: bigint) {
        const [address] = await this.walletClient.getAddresses();

        const abi = this.getContract();
        const estimatedGas = await this.publicClient.estimateContractGas({
            ...abi,
            account: address,
            functionName: 'withdraw',
            args: [this.convertCurrencyToBytes32(ccy), amount],
        });

        return this.walletClient.writeContract({
            ...abi,
            account: address,
            chain: this.config.chain,
            functionName: 'withdraw',
            args: [this.convertCurrencyToBytes32(ccy), amount],
            gas: this.calculateAdjustedGas(estimatedGas),
        });
    }

    /**
     * Retrieves the used currencies for a specific account.
     *
     * @param account - The account for which to retrieve the used currencies.
     * @returns A promise that resolves to the used currencies.
     */
    async getUsedCurrencies(account: string) {
        return this.publicClient.readContract({
            ...this.getContract(),
            functionName: 'getUsedCurrencies',
            args: [account as Hex],
        });
    }

    /**
     * Retrieves the total unused collateral amount for a given account.
     *
     * @param account - The account for which to retrieve the total unused collateral amount.
     * @returns A promise that resolves to the total unused collateral amount.
     */
    async getTotalUnusedCollateralAmount(account: string) {
        return this.publicClient.readContract({
            ...this.getContract(),
            functionName: 'getTotalUnusedCollateralAmount',
            args: [account as Hex],
        });
    }

    /**
     * Retrieves the collateral book for a given account.
     *
     * @param account - The account for which to retrieve the collateral book.
     * @returns An object containing the collateral book information, including collateral amounts, coverage, total collateral amount, and total unused collateral amount.
     */
    async getCollateralBook(account: string) {
        const currencies = await this.getUsedCurrencies(account);
        let collateral: Record<string, bigint> = {};

        if (currencies && currencies.length) {
            await Promise.all(
                currencies.map(async ccy => {
                    const balance = await this.publicClient.readContract({
                        ...this.getContract(),
                        functionName: 'getDepositAmount',
                        args: [account as Hex, ccy],
                    });
                    collateral = {
                        ...collateral,
                        [this.parseBytes32String(ccy)]: balance,
                    };
                })
            );
        }

        const [
            collateralCoverage,
            totalCollateralAmount,
            totalUnusedCollateralAmount,
        ] = await Promise.all([
            this.getCoverage(account),
            this.getTotalCollateralAmount(account),
            this.getTotalUnusedCollateralAmount(account),
        ]);

        return {
            collateral,
            collateralCoverage,
            totalCollateralAmount,
            totalUnusedCollateralAmount,
        };
    }

    /**
     * Retrieves the coverage for a specific account.
     *
     * @param account - The account for which to retrieve the coverage.
     * @returns A promise that resolves to the coverage value.
     */
    async getCoverage(account: string) {
        return this.publicClient.readContract({
            ...this.getContract(),
            functionName: 'getCoverage',
            args: [account as Hex],
        });
    }

    /**
     * Retrieves the total deposit amount for a given currency.
     *
     * @param currency - The currency for which to retrieve the total deposit amount.
     * @returns A promise that resolves to the total deposit amount.
     */
    async getTotalDepositAmount(currency: Currency) {
        return this.publicClient.readContract({
            ...this.getContract(),
            functionName: 'getTotalDepositAmount',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    /**
     * Retrieves the total collateral amount for a given account.
     *
     * @param account - The account for which to retrieve the total collateral amount.
     * @returns A promise that resolves to the total collateral amount.
     */
    async getTotalCollateralAmount(account: string) {
        return this.publicClient.readContract({
            ...this.getContract(),
            functionName: 'getTotalCollateralAmount',
            args: [account as Hex],
        });
    }

    /**
     * Retrieves the borrowable amount for a given account and currency.
     *
     * @param account - The account for which to retrieve the borrowable amount.
     * @param currency - The currency for which to retrieve the borrowable amount.
     * @returns A Promise that resolves to the borrowable amount.
     */
    async getBorrowableAmount(account: string, currency: Currency) {
        return this.publicClient.readContract({
            ...this.getContract(),
            functionName: 'getBorrowableAmount',
            args: [account as Hex, this.convertCurrencyToBytes32(currency)],
        });
    }
}