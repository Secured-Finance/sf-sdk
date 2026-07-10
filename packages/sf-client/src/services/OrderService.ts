import { Currency, getUTCMonthYear } from '@secured-finance/sf-core';
import { Hex } from 'viem';
import {
    getLendingMarketControllerContract,
    getLendingMarketReaderContract,
} from '../contracts';
import { OrderSide, WalletSource } from '../secured-finance-client';
import { BaseService, BaseServiceConfig } from './BaseService';

const ITAYOSE_PERIOD = 60 * 60;

export class OrderService extends BaseService {
    constructor(config: BaseServiceConfig) {
        super(config);
    }

    async getOrderEstimation(
        ccy: Currency,
        maturity: number,
        account: string,
        side: OrderSide,
        amount: bigint,
        unitPrice: number,
        additionalDepositAmount = 0n,
        ignoreBorrowedAmount = false
    ) {
        const args = {
            ccy: this.convertCurrencyToBytes32(ccy),
            maturity: BigInt(maturity),
            user: account as Hex,
            side,
            amount,
            unitPrice: BigInt(unitPrice),
            additionalDepositAmount,
            ignoreBorrowedAmount,
        };
        const result = await this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getOrderEstimation',
            args: [args],
        });
        return {
            lastUnitPrice: result[0],
            filledAmount: result[1],
            filledAmountInFV: result[2],
            orderFeeInFV: result[3],
            placedAmount: result[4],
            coverage: result[5],
            isInsufficientDepositAmount: result[6],
        };
    }

    async placeOrder(
        ccy: Currency,
        maturity: number,
        side: OrderSide,
        amount: bigint,
        sourceWallet: WalletSource,
        unitPrice?: number,
        deadline?: bigint,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        const address = await this.getWalletAddress();
        const contract = getLendingMarketControllerContract(this.config.env);
        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            if (ccy.isNative || !ccy.hasPermit) {
                const overrides: { value?: bigint; gas?: bigint } = {};
                if (ccy.isNative) {
                    overrides.value = amount;
                } else {
                    await onApproved?.(true);
                }
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...contract,
                        account: address,
                        functionName: 'depositAndExecuteOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice ?? 0),
                        ],
                        ...overrides,
                    });
                overrides.gas = this.calculateAdjustedGas(estimatedGas);
                if (!this.walletClient) {
                    throw new Error(
                        'Wallet client is required for this operation'
                    );
                }
                return this.walletClient.writeContract({
                    ...contract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'depositAndExecuteOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice ?? 0),
                    ],
                    ...overrides,
                });
            } else {
                throw new Error('Permit logic not implemented in OrderService');
            }
        } else {
            const estimatedGas = await this.publicClient.estimateContractGas({
                ...contract,
                account: address,
                functionName: 'executeOrder',
                args: [
                    this.convertCurrencyToBytes32(ccy),
                    BigInt(maturity),
                    side,
                    amount,
                    BigInt(unitPrice ?? 0),
                ],
            });
            if (!this.walletClient) {
                throw new Error('Wallet client is required for this operation');
            }
            return this.walletClient.writeContract({
                ...contract,
                account: address,
                chain: this.config.chain,
                functionName: 'executeOrder',
                args: [
                    this.convertCurrencyToBytes32(ccy),
                    BigInt(maturity),
                    side,
                    amount,
                    BigInt(unitPrice ?? 0),
                ],
                gas: this.calculateAdjustedGas(estimatedGas),
            });
        }
    }

    async placePreOrder(
        ccy: Currency,
        maturity: number,
        side: OrderSide,
        amount: bigint,
        sourceWallet: WalletSource,
        unitPrice: number,
        deadline?: bigint,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        const address = await this.getWalletAddress();
        const contract = getLendingMarketControllerContract(this.config.env);
        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            if (ccy.isNative || !ccy.hasPermit) {
                const overrides: { value?: bigint; gas?: bigint } = {};
                if (ccy.isNative) {
                    overrides.value = amount;
                } else {
                    await onApproved?.(true);
                }
                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...contract,
                        account: address,
                        functionName: 'depositAndExecutesPreOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice),
                        ],
                        ...overrides,
                    });
                overrides.gas = this.calculateAdjustedGas(estimatedGas);
                if (!this.walletClient) {
                    throw new Error(
                        'Wallet client is required for this operation'
                    );
                }
                return this.walletClient.writeContract({
                    ...contract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'depositAndExecutesPreOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice),
                    ],
                    ...overrides,
                });
            } else {
                throw new Error('Permit logic not implemented in OrderService');
            }
        } else {
            const estimatedGas = await this.publicClient.estimateContractGas({
                ...contract,
                account: address,
                functionName: 'executePreOrder',
                args: [
                    this.convertCurrencyToBytes32(ccy),
                    BigInt(maturity),
                    side,
                    amount,
                    BigInt(unitPrice),
                ],
            });
            if (!this.walletClient) {
                throw new Error('Wallet client is required for this operation');
            }
            return this.walletClient.writeContract({
                ...contract,
                account: address,
                chain: this.config.chain,
                functionName: 'executePreOrder',
                args: [
                    this.convertCurrencyToBytes32(ccy),
                    BigInt(maturity),
                    side,
                    amount,
                    BigInt(unitPrice),
                ],
                gas: this.calculateAdjustedGas(estimatedGas),
            });
        }
    }

    async cancelLendingOrder(ccy: Currency, maturity: number, orderID: number) {
        const address = await this.getWalletAddress();
        if (!this.walletClient) {
            throw new Error('Wallet client is required for this operation');
        }
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'cancelOrder',
            args: [
                this.convertCurrencyToBytes32(ccy),
                BigInt(maturity),
                orderID,
            ],
        });
    }

    async getOrderBookDetail(ccy: Currency, maturity: number) {
        return this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getOrderBookDetail',
            args: [this.convertCurrencyToBytes32(ccy), BigInt(maturity)],
        });
    }

    async getOrderBookDetailsPerCurrency(ccy: Currency) {
        return this.getOrderBookDetails([ccy]);
    }

    async getOrderBookDetails(ccys: Currency[]) {
        const orderBookDetails = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getOrderBookDetails',
            args: [this.convertCurrencyArrayToBytes32Array(ccys)],
        });
        const timestamp = Math.floor(Date.now() / 1000);
        return orderBookDetails.map(orderBook => {
            const maturity = Number(orderBook.maturity);
            const openingDate = Number(orderBook.openingDate);
            const preOpeningDate = Number(orderBook.preOpeningDate);
            const isReady = orderBook.isReady;
            const isMatured = timestamp >= maturity;
            const isOpened = isReady && !isMatured && timestamp >= openingDate;
            return {
                ...orderBook,
                name: getUTCMonthYear(maturity, true),
                isMatured,
                isOpened,
                isItayosePeriod:
                    !isReady && timestamp >= openingDate - ITAYOSE_PERIOD,
                isPreOrderPeriod:
                    timestamp >= preOpeningDate &&
                    timestamp < openingDate - ITAYOSE_PERIOD,
            };
        });
    }

    async getBestLendUnitPrices(ccy: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getBestLendUnitPrices',
            args: [this.convertCurrencyToBytes32(ccy)],
        });
    }

    async getBestBorrowUnitPrices(ccy: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getBestBorrowUnitPrices',
            args: [this.convertCurrencyToBytes32(ccy)],
        });
    }

    async getOrderBookId(currency: Currency, maturity: number) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getOrderBookId',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
    }

    async getOrderList(account: string, usedCurrenciesForOrders: Currency[]) {
        const res = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getOrders',
            args: [
                this.convertCurrencyArrayToBytes32Array(
                    usedCurrenciesForOrders
                ),
                account as Hex,
            ],
        });
        return { activeOrders: res[0], inactiveOrders: res[1] };
    }

    async getOrderFeeRate(currency: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getOrderFeeRate',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    async getBorrowOrderBook(
        currency: Currency,
        maturity: number,
        start: number,
        limit: number
    ) {
        const result = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getBorrowOrderBook',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                BigInt(start),
                BigInt(limit),
            ],
        });
        return {
            unitPrices: result[0],
            amounts: result[1],
            quantities: result[2],
            next: result[3],
        };
    }

    async getLendOrderBook(
        currency: Currency,
        maturity: number,
        start: number,
        limit: number
    ) {
        const result = await this.publicClient.readContract({
            ...getLendingMarketReaderContract(this.config.env),
            functionName: 'getLendOrderBook',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                BigInt(start),
                BigInt(limit),
            ],
        });
        return {
            unitPrices: result[0],
            amounts: result[1],
            quantities: result[2],
            next: result[3],
        };
    }
}
