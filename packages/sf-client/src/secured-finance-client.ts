import { splitSignature } from '@ethersproject/bytes';
import { Currency, Token } from '@secured-finance/sf-core';
import {
    Hex,
    PublicClient,
    WalletClient,
    hexToString,
    stringToHex,
    createPublicClient,
    http,
} from 'viem';
import { ERC20Abi } from './ERC20Abi';
import {
    getCurrencyControllerContract,
    getLendingMarketControllerContract,
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
import {
    OrderService,
    MarketService,
    PositionService,
    TokenService,
} from './services';

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

    private parseBytes32String(ccy: string) {
        return hexToString(ccy as Hex, { size: 32 });
    }

    private createPublicClientWithChain(chainId?: number) {
        return chainId
            ? createPublicClient({
                  chain: CHAINS[chainId],
                  transport: http(),
              })
            : this.publicClient;
    }

    private getTargetEnvironment(chainId?: number) {
        return chainId !== undefined
            ? getEnvironmentByChainId(chainId)
            : this.config.env;
    }

    private _config: SecuredFinanceClientConfig | undefined;
    private _walletClient: WalletClient | undefined;
    private _publicClient: PublicClient | undefined;
    private _tokenVault: TokenVault | undefined;

    private orderService!: OrderService;
    private positionService!: PositionService;
    private marketService!: MarketService;
    private tokenService!: TokenService;

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

        const baseServiceConfig = {
            config: this._config,
            publicClient,
            walletClient,
            tokenVault: this._tokenVault,
        };

        this.marketService = new MarketService(baseServiceConfig);
        this.tokenService = new TokenService(baseServiceConfig);
        this.positionService = new PositionService(baseServiceConfig);
        this.orderService = new OrderService(baseServiceConfig);
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
        return this.orderService.getOrderEstimation(
            ccy,
            maturity,
            account,
            side,
            amount,
            unitPrice,
            additionalDepositAmount,
            ignoreBorrowedAmount
        );
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
        return this.orderService.getBestLendUnitPrices(ccy);
    }

    async getBestBorrowUnitPrices(ccy: Currency) {
        return this.orderService.getBestBorrowUnitPrices(ccy);
    }

    async getMaturities(ccy: Currency) {
        return this.publicClient.readContract({
            ...getLendingMarketControllerContract(this.config.env),
            functionName: 'getMaturities',
            args: [this.convertCurrencyToBytes32(ccy)],
        });
    }

    async getOrderBookDetail(ccy: Currency, maturity: number) {
        return this.orderService.getOrderBookDetail(ccy, maturity);
    }

    async getOrderBookDetailsPerCurrency(ccy: Currency) {
        return this.orderService.getOrderBookDetailsPerCurrency(ccy);
    }

    async getOrderBookDetails(ccys: Currency[]) {
        return this.orderService.getOrderBookDetails(ccys);
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
        return this.orderService.placeOrder(
            ccy,
            maturity,
            side,
            amount,
            sourceWallet,
            unitPrice,
            deadline,
            onApproved
        );
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
        return this.orderService.placePreOrder(
            ccy,
            maturity,
            side,
            amount,
            sourceWallet,
            unitPrice,
            deadline,
            onApproved
        );
    }

    async cancelLendingOrder(ccy: Currency, maturity: number, orderID: number) {
        return this.orderService.cancelLendingOrder(ccy, maturity, orderID);
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
        return this.orderService.getBorrowOrderBook(
            currency,
            maturity,
            start,
            limit
        );
    }

    async getLendOrderBook(
        currency: Currency,
        maturity: number,
        start: number,
        limit: number
    ) {
        return this.orderService.getLendOrderBook(
            currency,
            maturity,
            start,
            limit
        );
    }

    // Mock ERC20 token related functions
    async mintERC20Token(token: Token) {
        return this.tokenService.mintERC20Token(token);
    }

    async getERC20TokenContractAddress(token: Token) {
        return this.tokenService.getERC20TokenContractAddress(token);
    }

    async getERC20Balance(token: Token, account: string) {
        return this.tokenService.getERC20Balance(token, account);
    }

    async getERC20TokenBalance(tokenAddress: string, account: string) {
        return this.tokenService.getERC20TokenBalance(tokenAddress, account);
    }

    async getERC20TokenName(tokenAddress: string) {
        return this.tokenService.getERC20TokenName(tokenAddress);
    }

    async getUserNonceFromPermitToken(tokenAddress: string, account: string) {
        return this.tokenService.getUserNonceFromPermitToken(
            tokenAddress,
            account
        );
    }

    async getCollateralCurrencies() {
        return this.tokenService.getCollateralCurrencies();
    }

    async getCurrencies() {
        return this.tokenService.getCurrencies();
    }

    async currencyExists(ccy: Currency) {
        return this.tokenService.currencyExists(ccy);
    }

    async getZCToken(currency: Currency, maturity: number) {
        return this.tokenService.getZCToken(currency, maturity);
    }

    async getWithdrawableZCTokenAmount(
        currency: Currency,
        maturity: number,
        account: string
    ) {
        return this.tokenService.getWithdrawableZCTokenAmount(
            currency,
            maturity,
            account
        );
    }

    async withdrawZCToken(
        currency: Currency,
        maturity: number,
        amount: bigint
    ) {
        return this.tokenService.withdrawZCToken(currency, maturity, amount);
    }

    async depositZCToken(currency: Currency, maturity: number, amount: bigint) {
        return this.tokenService.depositZCToken(currency, maturity, amount);
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
        if (!nonce) throw new Error('Failed to get nonce');

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
        const publicClient = this.createPublicClientWithChain(chainId);
        const currencyList = await this.getCurrencies();
        if (!currencyList) return {};

        const targetEnv = this.getTargetEnvironment(chainId);
        const contract = getTokenVaultContract(targetEnv);
        const totalDepositAmounts = await Promise.allSettled(
            currencyList.map(currency =>
                publicClient.readContract({
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
        return this.positionService.unwindPosition(currency, maturity);
    }

    async getTotalPresentValueInBaseCurrency(account: string) {
        return this.positionService.getTotalPresentValueInBaseCurrency(account);
    }

    async executeRepayment(currency: Currency, maturity: number) {
        return this.positionService.executeRepayment(currency, maturity);
    }

    async executeRedemption(currency: Currency, maturity: number) {
        return this.positionService.executeRedemption(currency, maturity);
    }

    async getOrderFeeRate(currency: Currency) {
        return this.orderService.getOrderFeeRate(currency);
    }

    async getOrderBookId(currency: Currency, maturity: number) {
        return this.orderService.getOrderBookId(currency, maturity);
    }

    async getOrderList(account: string, usedCurrenciesForOrders: Currency[]) {
        return this.orderService.getOrderList(account, usedCurrenciesForOrders);
    }

    async getPositions(account: string, usedCurrenciesForOrders: Currency[]) {
        return this.positionService.getPositions(
            account,
            usedCurrenciesForOrders
        );
    }

    async getUsedCurrenciesForOrders(account: string) {
        return this.positionService.getUsedCurrenciesForOrders(account);
    }

    async executeLiquidationCall(
        collateralCcy: Currency,
        debtCcy: Currency,
        debtMaturity: number,
        account: string
    ) {
        return this.positionService.executeLiquidationCall(
            collateralCcy,
            debtCcy,
            debtMaturity,
            account
        );
    }

    async getLastPrice(currency: Currency) {
        return this.marketService.getLastPrice(currency);
    }

    async getDecimals(currency: Currency) {
        return this.marketService.getDecimals(currency);
    }

    async isTerminated() {
        return this.marketService.isTerminated();
    }

    async getMarketTerminationDate() {
        return this.marketService.getMarketTerminationDate();
    }

    async getMarketTerminationRatio(currency: Currency) {
        return this.marketService.getMarketTerminationRatio(currency);
    }

    async getMarketTerminationPriceAndDecimals(currency: Currency) {
        return this.marketService.getMarketTerminationPriceAndDecimals(
            currency
        );
    }

    async isRedemptionRequired(account: string) {
        return this.marketService.isRedemptionRequired(account);
    }

    async executeEmergencySettlement() {
        return this.marketService.executeEmergencySettlement();
    }

    async getItayoseEstimation(currency: Currency, maturity: number) {
        return this.marketService.getItayoseEstimation(currency, maturity);
    }

    async getGenesisValue(currency: Currency, account: string) {
        return this.marketService.getGenesisValue(currency, account);
    }

    async getLatestAutoRollLog(currency: Currency) {
        return this.marketService.getLatestAutoRollLog(currency);
    }

    async getAutoRollLog(currency: Currency, maturity: number) {
        return this.marketService.getAutoRollLog(currency, maturity);
    }

    async calculateFVFromGV(
        currency: Currency,
        maturity: number,
        amount: bigint
    ) {
        return this.marketService.calculateFVFromGV(currency, maturity, amount);
    }
}
