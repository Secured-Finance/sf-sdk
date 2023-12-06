import { Currency } from '@secured-finance/sf-core';
import { Hex } from 'viem';
import { tokenVaultDevContract, tokenVaultStgContract } from '../contracts';
import { BaseContract } from './BaseContract';

export class TokenVault extends BaseContract {
    private getAbi() {
        switch (this.config.env) {
            case 'development':
                return tokenVaultDevContract;
            default:
            case 'staging':
                return tokenVaultStgContract;
        }
    }

    async getTokenAddress(currency: Currency) {
        return this.publicClient.readContract({
            ...this.getAbi(),
            functionName: 'getTokenAddress',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    async getCollateralParameters() {
        let result: readonly [bigint, bigint, bigint];
        switch (this.config.env) {
            case 'development':
                result = await this.publicClient.readContract({
                    ...tokenVaultDevContract,
                    functionName: 'getLiquidationConfiguration',
                });
                break;
            default:
            case 'staging':
                result = await this.publicClient.readContract({
                    ...tokenVaultStgContract,
                    functionName: 'getLiquidationConfiguration',
                });
        }

        return {
            liquidationThresholdRate: result[0],
            liquidationProtocolFeeRate: result[1],
            liquidatorFeeRate: result[2],
        };
    }

    async getWithdrawableCollateral(ccy: Currency, account: string) {
        switch (this.config.env) {
            case 'development':
                return this.publicClient.readContract({
                    ...tokenVaultDevContract,
                    functionName: 'getWithdrawableCollateral',
                    args: [this.convertCurrencyToBytes32(ccy), account as Hex],
                });
            default:
            case 'staging':
                return this.publicClient.readContract({
                    ...tokenVaultStgContract,
                    functionName: 'getWithdrawableCollateral',
                    args: [this.convertCurrencyToBytes32(ccy), account as Hex],
                });
        }
    }

    async withdrawCollateral(ccy: Currency, amount: bigint) {
        const [address] = await this.walletClient.getAddresses();

        switch (this.config.env) {
            case 'development': {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...tokenVaultDevContract,
                        account: address,
                        functionName: 'withdraw',
                        args: [this.convertCurrencyToBytes32(ccy), amount],
                    });
                return this.walletClient.writeContract({
                    ...tokenVaultDevContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'withdraw',
                    args: [this.convertCurrencyToBytes32(ccy), amount],
                    gas: this.calculateAdjustedGas(estimatedGas),
                });
            }
            default:
            case 'staging': {
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...tokenVaultStgContract,
                        account: address,
                        functionName: 'withdraw',
                        args: [this.convertCurrencyToBytes32(ccy), amount],
                    });
                return this.walletClient.writeContract({
                    ...tokenVaultStgContract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'withdraw',
                    args: [this.convertCurrencyToBytes32(ccy), amount],
                    gas: this.calculateAdjustedGas(estimatedGas),
                });
            }
        }
    }

    async getUsedCurrencies(account: string) {
        switch (this.config.env) {
            case 'development':
                return this.publicClient.readContract({
                    ...tokenVaultDevContract,
                    functionName: 'getUsedCurrencies',
                    args: [account as Hex],
                });
            default:
            case 'staging':
                return this.publicClient.readContract({
                    ...tokenVaultStgContract,
                    functionName: 'getUsedCurrencies',
                    args: [account as Hex],
                });
        }
    }

    async getTotalUnusedCollateralAmount(account: string) {
        switch (this.config.env) {
            case 'development':
                return this.publicClient.readContract({
                    ...tokenVaultDevContract,
                    functionName: 'getTotalUnusedCollateralAmount',
                    args: [account as Hex],
                });
            default:
            case 'staging':
                return this.publicClient.readContract({
                    ...tokenVaultStgContract,
                    functionName: 'getTotalUnusedCollateralAmount',
                    args: [account as Hex],
                });
        }
    }

    async getCollateralBook(account: string) {
        const currencies = await this.getUsedCurrencies(account);
        let collateral: Record<string, bigint> = {};

        if (currencies && currencies.length) {
            await Promise.all(
                currencies.map(async ccy => {
                    switch (this.config.env) {
                        case 'development':
                            {
                                const balance =
                                    await this.publicClient.readContract({
                                        ...tokenVaultDevContract,
                                        functionName: 'getDepositAmount',
                                        args: [account as Hex, ccy],
                                    });
                                collateral = {
                                    ...collateral,
                                    [this.parseBytes32String(ccy)]: balance,
                                };
                            }
                            break;
                        default:
                        case 'staging': {
                            const balance =
                                await this.publicClient.readContract({
                                    ...tokenVaultStgContract,
                                    functionName: 'getDepositAmount',
                                    args: [account as Hex, ccy],
                                });
                            collateral = {
                                ...collateral,
                                [this.parseBytes32String(ccy)]: balance,
                            };
                        }
                    }
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

    async getCoverage(account: string) {
        switch (this.config.env) {
            case 'development':
                return this.publicClient.readContract({
                    ...tokenVaultDevContract,
                    functionName: 'getCoverage',
                    args: [account as Hex],
                });
            default:
            case 'staging':
                return this.publicClient.readContract({
                    ...tokenVaultStgContract,
                    functionName: 'getCoverage',
                    args: [account as Hex],
                });
        }
    }

    async getTotalDepositAmount(currency: Currency) {
        switch (this.config.env) {
            case 'development':
                return this.publicClient.readContract({
                    ...tokenVaultDevContract,
                    functionName: 'getTotalDepositAmount',
                    args: [this.convertCurrencyToBytes32(currency)],
                });
            default:
            case 'staging':
                return this.publicClient.readContract({
                    ...tokenVaultStgContract,
                    functionName: 'getTotalDepositAmount',
                    args: [this.convertCurrencyToBytes32(currency)],
                });
        }
    }

    async getTotalCollateralAmount(account: string) {
        switch (this.config.env) {
            case 'development':
                return this.publicClient.readContract({
                    ...tokenVaultDevContract,
                    functionName: 'getTotalCollateralAmount',
                    args: [account as Hex],
                });
            default:
            case 'staging':
                return this.publicClient.readContract({
                    ...tokenVaultStgContract,
                    functionName: 'getTotalCollateralAmount',
                    args: [account as Hex],
                });
        }
    }

    async getBorrowableAmount(account: string, currency: Currency) {
        switch (this.config.env) {
            case 'development':
                return this.publicClient.readContract({
                    ...tokenVaultDevContract,
                    functionName: 'getBorrowableAmount',
                    args: [
                        account as Hex,
                        this.convertCurrencyToBytes32(currency),
                    ],
                });
            default:
            case 'staging':
                return this.publicClient.readContract({
                    ...tokenVaultStgContract,
                    functionName: 'getBorrowableAmount',
                    args: [
                        account as Hex,
                        this.convertCurrencyToBytes32(currency),
                    ],
                });
        }
    }
}
