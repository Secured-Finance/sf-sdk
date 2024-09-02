import { splitSignature } from '@ethersproject/bytes';
import { Currency, Token, getUTCMonthYear } from '@secured-finance/sf-core';
import {
    Address,
    Hex,
    PublicClient,
    WalletClient,
    hexToString,
    stringToHex,
} from 'viem';
import { ERC20Abi } from './ERC20Abi';
import { ERC20PermitAbi } from './ERC20PermitAbi';
import {
    getCurrencyControllerContract,
    getGenesisValueVaultContract,
    getLendingMarketControllerContract,
    getLendingMarketReaderContract,
    getTokenFaucetContract,
    getTokenVaultContract,
} from './contracts';
import { TokenVault } from './contracts/TokenVault';
import { SecuredFinanceClientConfig } from './entities';
import {
    CHAINS,
    NETWORKS,
    NetworkName,
    getContractEnvironment,
    networkNames,
    getEnvironmentByChainId,
} from './utils';

export interface PayableOverrides {
    value?: bigint;
    gas?: bigint;
}

export enum OrderSide {
    LEND = 0,
    BORROW = 1,
}

export enum WalletSource {
    METAMASK = 'Metamask',
    SF_VAULT = 'SF Vault',
}

// TODO: get those from the contracts
export const ITAYOSE_PERIOD = 60 * 60; // 1 hour in seconds

const CLIENT_NOT_INITIALIZED = 'Client is not initialized';
const maxUint256 = 2n ** 256n - 1n;

function assertNonNullish<TValue>(
    value: TValue | undefined,
    message = CLIENT_NOT_INITIALIZED
): asserts value is NonNullable<TValue> {
    if (!value) {
        throw new Error(message);
    }
}

export class SecuredFinanceClient {
    private convertCurrencyToBytes32(ccy: Currency) {
        if (ccy.isNative) {
            return stringToHex(ccy.symbol, { size: 32 });
        } else {
            return stringToHex(ccy.wrapped.symbol, { size: 32 });
        }
    }

    private convertCurrencyArrayToBytes32Array(currencies: Currency[]) {
        return currencies.map(currency =>
            this.convertCurrencyToBytes32(currency)
        );
    }

    private parseBytes32String(ccy: string) {
        return hexToString(ccy as Hex, { size: 32 });
    }

    private calculateAdjustedGas(amount: bigint) {
        // NOTE: This adjustment is for the function that executes the collateral coverage check.
        // Without this adjustment, the transaction often fails due to out-of-gas error.
        return (amount * 11n) / 10n;
    }

    private _config: SecuredFinanceClientConfig | undefined;
    private _walletClient: WalletClient | undefined;
    private _publicClient: PublicClient | undefined;
    private _tokenVault: TokenVault | undefined;

    async init(
        publicClient: PublicClient,
        walletClient?: WalletClient,
        options?: {
            defaultGas?: number;
            defaultGasPrice?: number;
        }
    ) {
        const chainId = await publicClient.getChainId();
        const networkName = NETWORKS[chainId] as NetworkName;

        if (!networkNames.includes(networkName)) {
            throw new Error(`ChainId ${chainId} is not supported.`);
        }

        const env = getContractEnvironment(networkName);

        this._config = {
            defaultGas: options?.defaultGas || 6000000,
            defaultGasPrice: options?.defaultGasPrice || 1000000000000,
            networkId: chainId,
            network: networkName,
            env: env,
            chain: CHAINS[chainId],
        };

        this._walletClient = walletClient;
        this._publicClient = publicClient;
        this._tokenVault = new TokenVault(
            this._config,
            publicClient,
            walletClient
        );
    }

    get config() {
        assertNonNullish(this._config);
        return this._config;
    }

    get publicClient(): PublicClient {
        assertNonNullish(this._publicClient);
        return this._publicClient;
    }

    get walletClient(): WalletClient {
        assertNonNullish(this._walletClient);
        return this._walletClient;
    }

    get tokenVault() {
        assertNonNullish(this._tokenVault);
        return this._tokenVault;
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

    async depositCollateral(
        ccy: Currency,
        amount: bigint,
        deadline?: bigint,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        const [address] = await this.walletClient.getAddresses();

        if (ccy.isNative || !ccy.hasPermit) {
            const payableOverride: PayableOverrides = {};
            if (ccy.isNative) {
                payableOverride.value = amount;
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
            }

            return this.walletClient.writeContract({
                ...getTokenVaultContract(this.config.env),
                account: address,
                chain: this.config.chain,
                functionName: 'deposit',
                args: [this.convertCurrencyToBytes32(ccy), amount],
                ...payableOverride,
            });
        } else {
            const deadline_ = deadline ?? (await this.getDefaultDeadline());

            const sig = await this.getPermitSignature(ccy, amount, deadline_);

            return this.walletClient.writeContract({
                ...getTokenVaultContract(this.config.env),
                account: address,
                chain: this.config.chain,
                functionName: 'depositWithPermitTo',
                args: [
                    this.convertCurrencyToBytes32(ccy),
                    amount,
                    address,
                    deadline_,
                    sig.v,
                    sig.r as `0x${string}`,
                    sig.s as `0x${string}`,
                ],
            });
        }
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

    async getMaturities(ccy: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getMaturities',
            args: [this.convertCurrencyToBytes32(ccy)],
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

    /**
     *
     * @param ccy the Currency object of the selected market
     * @param maturity the maturity of the selected market
     * @param side Order position type, 0 for lend, 1 for borrow
     * @param amount Amount of funds the maker wants to borrow/lend
     * @param unitPrice Unit price the taker is willing to pay/receive. 0 for placing a market order
     * @param deadline When ccy provides the permit function, the deadline is used during the permit call.
     * @param onApproved callback function to be called after the approval transaction is mined
     * @returns a `ContractTransaction`
     */
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
        const [address] = await this.walletClient.getAddresses();
        const contract = getLendingMarketControllerContract(this.config.env);

        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            if (ccy.isNative || !ccy.hasPermit) {
                const overrides: PayableOverrides = {};

                if (ccy.isNative) {
                    overrides.value = amount;
                } else {
                    const isApproved = await this.approveTokenTransfer(
                        ccy,
                        amount
                    );
                    await onApproved?.(isApproved);
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
                const deadline_ = deadline ?? (await this.getDefaultDeadline());

                const sig = await this.getPermitSignature(
                    ccy,
                    amount,
                    deadline_
                );

                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...contract,
                        account: address,
                        functionName: 'depositWithPermitAndExecuteOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice ?? 0),
                            deadline_,
                            sig.v,
                            sig.r as `0x${string}`,
                            sig.s as `0x${string}`,
                        ],
                    });
                return this.walletClient.writeContract({
                    ...contract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'depositWithPermitAndExecuteOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice ?? 0),
                        deadline_,
                        sig.v,
                        sig.r as `0x${string}`,
                        sig.s as `0x${string}`,
                    ],
                    gas: this.calculateAdjustedGas(estimatedGas),
                });
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
        const [address] = await this.walletClient.getAddresses();
        const contract = getLendingMarketControllerContract(this.config.env);

        if (side === OrderSide.LEND && sourceWallet === WalletSource.METAMASK) {
            if (ccy.isNative || !ccy.hasPermit) {
                const overrides: PayableOverrides = {};

                if (ccy.isNative) {
                    overrides.value = amount;
                } else {
                    const isApproved = await this.approveTokenTransfer(
                        ccy,
                        amount
                    );
                    await onApproved?.(isApproved);
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
                const deadline_ = deadline ?? (await this.getDefaultDeadline());

                const sig = await this.getPermitSignature(
                    ccy,
                    amount,
                    deadline_
                );

                const estimatedGas =
                    await this.publicClient.estimateContractGas({
                        ...contract,
                        account: address,
                        functionName: 'depositWithPermitAndExecutePreOrder',
                        args: [
                            this.convertCurrencyToBytes32(ccy),
                            BigInt(maturity),
                            side,
                            amount,
                            BigInt(unitPrice),
                            deadline_,
                            sig.v,
                            sig.r as `0x${string}`,
                            sig.s as `0x${string}`,
                        ],
                    });

                return this.walletClient.writeContract({
                    ...contract,
                    account: address,
                    chain: this.config.chain,
                    functionName: 'depositWithPermitAndExecutePreOrder',
                    args: [
                        this.convertCurrencyToBytes32(ccy),
                        BigInt(maturity),
                        side,
                        amount,
                        BigInt(unitPrice),
                        deadline_,
                        sig.v,
                        sig.r as `0x${string}`,
                        sig.s as `0x${string}`,
                    ],
                    gas: this.calculateAdjustedGas(estimatedGas),
                });
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
        const [address] = await this.walletClient.getAddresses();
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

    async convertToBaseCurrency(ccy: Currency, amount: bigint) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'convertToBaseCurrency',
            args: [this.convertCurrencyToBytes32(ccy), amount],
        });
    }

    async convert(fromCcy: Currency, toCcy: Currency, amount: bigint) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'convert',
            args: [
                this.convertCurrencyToBytes32(fromCcy),
                this.convertCurrencyToBytes32(toCcy),
                amount,
            ],
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

    // Mock ERC20 token related functions
    async mintERC20Token(token: Token) {
        const [account] = await this.walletClient.getAddresses();
        const { abi, address } = getTokenFaucetContract(this.config.env);

        if (address) {
            return this.walletClient.writeContract({
                abi,
                address,
                account,
                chain: this.config.chain,
                functionName: 'mint',
                args: [this.convertCurrencyToBytes32(token)],
            });
        } else {
            throw new Error(`Faucet is not available on ${this.config.env}`);
        }
    }

    async getERC20TokenContractAddress(token: Token) {
        const { abi, address } = getTokenFaucetContract(this.config.env);
        if (address) {
            return this.publicClient.readContract({
                abi,
                address,
                functionName: 'getCurrencyAddress',
                args: [this.convertCurrencyToBytes32(token)],
            });
        } else {
            throw new Error(`Faucet is not available on ${this.config.env}`);
        }
    }

    async getCurrencies(chainId?: number) {
        const targetEnv =
            chainId !== undefined
                ? getEnvironmentByChainId(chainId)
                : this.config.env;

        return this.publicClient.readContract({
            ...getCurrencyControllerContract(targetEnv),
            functionName: 'getCurrencies',
        });
    }

    async currencyExists(ccy: Currency) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'currencyExists',
            args: [this.convertCurrencyToBytes32(ccy)],
        });
    }

    async getCollateralCurrencies() {
        return this.publicClient.readContract({
            ...getTokenVaultContract(this.config.env),
            functionName: 'getCollateralCurrencies',
        });
    }

    async getERC20Balance(token: Token, account: string) {
        const address = await this.tokenVault.getTokenAddress(token);
        return this.publicClient.readContract({
            abi: ERC20Abi,
            address: address,
            functionName: 'balanceOf',
            args: [account as Hex],
        });
    }

    async getERC20TokenBalance(tokenAddress: string, account: string) {
        return this.publicClient.readContract({
            abi: ERC20Abi,
            address: tokenAddress as Address,
            functionName: 'balanceOf',
            args: [account as Hex],
        });
    }

    async getERC20TokenName(tokenAddress: string) {
        return this.publicClient.readContract({
            abi: ERC20Abi,
            address: tokenAddress as Address,
            functionName: 'name',
        });
    }

    async getUserNonceFromPermitToken(tokenAddress: string, account: string) {
        return this.publicClient.readContract({
            abi: ERC20PermitAbi,
            address: tokenAddress as Address,
            functionName: 'nonces',
            args: [account as Hex],
        });
    }

    private async getDefaultDeadline() {
        const latestBlock = await this.publicClient.getBlock({
            blockTag: 'latest',
        });
        return latestBlock.timestamp + BigInt(600);
    }

    private async getPermitSignature(
        ccy: Token,
        amount: bigint,
        deadline: bigint
    ) {
        const tokenAddress = await this.tokenVault.getTokenAddress(ccy);
        const [address] = await this.walletClient.getAddresses();
        const spender = getTokenVaultContract(this.config.env).address;
        const nonce = await this.getUserNonceFromPermitToken(
            tokenAddress,
            address
        );

        const domain = {
            name: await this.getERC20TokenName(tokenAddress),
            version: ccy.eip712Version ?? '1',
            chainId: this.config.networkId,
            verifyingContract: tokenAddress,
        };

        const types = {
            Permit: [
                { name: 'owner', type: 'address' },
                { name: 'spender', type: 'address' },
                { name: 'value', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint256' },
            ],
        };

        const message = {
            owner: address,
            spender: spender,
            value: amount.toString(),
            nonce: nonce.toString(),
            deadline: deadline.toString(),
        };

        const signature = await this.walletClient.signTypedData({
            account: address,
            domain,
            types,
            primaryType: 'Permit',
            message: message,
        });

        return splitSignature(signature);
    }

    private async approveTokenTransfer(ccy: Currency, amount: bigint) {
        const [address] = await this.walletClient.getAddresses();
        const tokenAddress = await this.tokenVault.getTokenAddress(ccy);

        if (ccy.isToken) {
            const spender = getTokenVaultContract(this.config.env).address;
            const allowance = await this.publicClient.readContract({
                abi: ERC20Abi,
                address: tokenAddress,
                functionName: 'allowance',
                args: [address, spender],
            });

            if (allowance < amount) {
                const tx = await this.walletClient.writeContract({
                    abi: ERC20Abi,
                    address: tokenAddress,
                    functionName: 'approve',
                    args: [spender, maxUint256 - amount],
                    account: address,
                    chain: this.config.chain,
                });
                await this.publicClient.waitForTransactionReceipt({
                    hash: tx,
                });
                return true;
            }
        }
        return false;
    }

    async getProtocolDepositAmount(chainId?: number) {
        const currencyList = await this.getCurrencies(chainId);

        const targetEnv =
            chainId !== undefined
                ? getEnvironmentByChainId(chainId)
                : this.config.env;
                
        const contract = getTokenVaultContract(targetEnv);
        const totalDepositAmounts = await Promise.allSettled(
            currencyList.map(currency =>
                this.publicClient.readContract({
                    ...contract,
                    functionName: 'getTotalDepositAmount',
                    args: [currency],
                })
            )
        );

        return totalDepositAmounts.reduce((acc, cur, index) => {
            if (cur.status === 'fulfilled') {
                if (cur.value) {
                    acc[this.parseBytes32String(currencyList[index])] =
                        cur.value;
                }
            }
            return acc;
        }, {} as Record<string, bigint>);
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

    async getOrderFeeRate(currency: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getOrderFeeRate',
            args: [this.convertCurrencyToBytes32(currency)],
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
            gas: this.calculateAdjustedGas(estimatedGas),
        });
    }

    async getLastPrice(currency: Currency, chainId?: number) {
        const targetEnv =
            chainId !== undefined
                ? getEnvironmentByChainId(chainId)
                : this.config.env;

        return this.publicClient.readContract({
            ...getCurrencyControllerContract(targetEnv),
            functionName: 'getLastPrice',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    /**
     * Gets aggregated and cached decimals of the price feeds for the selected currency
     * @param currency
     */
    async getDecimals(currency: Currency) {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
            functionName: 'getDecimals',
            args: [this.convertCurrencyToBytes32(currency)],
        });
    }

    /*
     * Global Emergency Settlement
     */
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

    async getZCToken(currency: Currency, maturity: number) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getZCToken',
            args: [this.convertCurrencyToBytes32(currency), BigInt(maturity)],
        });
    }

    async getWithdrawableZCTokenAmount(
        currency: Currency,
        maturity: number,
        account: string
    ) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getWithdrawableZCTokenAmount',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                account as Hex,
            ],
        });
    }

    async withdrawZCToken(
        currency: Currency,
        maturity: number,
        amount: bigint
    ) {
        const [address] = await this.walletClient.getAddresses();
        const estimatedGas = await this.publicClient.estimateContractGas({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            functionName: 'withdrawZCToken',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                amount,
            ],
        });
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'withdrawZCToken',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                amount,
            ],
            gas: this.calculateAdjustedGas(estimatedGas),
        });
    }

    async depositZCToken(currency: Currency, maturity: number, amount: bigint) {
        const [address] = await this.walletClient.getAddresses();
        const estimatedGas = await this.publicClient.estimateContractGas({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            functionName: 'depositZCToken',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                amount,
            ],
        });
        return this.walletClient.writeContract({
            ...getLendingMarketControllerContract(this.config.env),
            account: address,
            chain: this.config.chain,
            functionName: 'depositZCToken',
            args: [
                this.convertCurrencyToBytes32(currency),
                BigInt(maturity),
                amount,
            ],
            gas: this.calculateAdjustedGas(estimatedGas),
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
