import { Currency } from '@secured-finance/sf-core';
import {
    Hex,
    PublicClient,
    WalletClient,
    hexToString,
    stringToHex,
    createPublicClient,
    http,
} from 'viem';
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
import { OrderService } from './services/OrderService';
import { PositionService } from './services/PositionService';
import { MarketService } from './services/MarketService';
import { TokenService } from './services/TokenService';

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
    private orderService?: OrderService;
    private positionService?: PositionService;
    private marketService?: MarketService;
    private tokenService?: TokenService;

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
        // Initialize services
        if (walletClient) {
            this.orderService = new OrderService(
                this._config,
                publicClient,
                walletClient,
                this._tokenVault
            );
            this.positionService = new PositionService(
                this._config,
                publicClient,
                walletClient,
                this._tokenVault
            );
            this.marketService = new MarketService(
                this._config,
                publicClient,
                walletClient
            );
            this.tokenService = new TokenService(
                this._config,
                publicClient,
                walletClient,
                this._tokenVault
            );
        }
    }

    get config() {
        if (!this._config) throw new Error(CLIENT_NOT_INITIALIZED);
        return this._config;
    }
    get publicClient(): PublicClient {
        if (!this._publicClient) throw new Error(CLIENT_NOT_INITIALIZED);
        return this._publicClient;
    }
    get walletClient(): WalletClient {
        if (!this._walletClient) throw new Error(CLIENT_NOT_INITIALIZED);
        return this._walletClient;
    }
    get tokenVault() {
        if (!this._tokenVault) throw new Error(CLIENT_NOT_INITIALIZED);
        return this._tokenVault;
    }

    // --- OrderService Delegation ---
    async placeOrder(...args: Parameters<OrderService['placeOrder']>) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.placeOrder(...args);
    }
    async placePreOrder(...args: Parameters<OrderService['placePreOrder']>) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.placePreOrder(...args);
    }
    async cancelLendingOrder(
        ...args: Parameters<OrderService['cancelLendingOrder']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.cancelLendingOrder(...args);
    }
    async getOrderEstimation(
        ...args: Parameters<OrderService['getOrderEstimation']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getOrderEstimation(...args);
    }
    async getOrderBookDetail(
        ...args: Parameters<OrderService['getOrderBookDetail']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getOrderBookDetail(...args);
    }
    async getOrderBookDetails(
        ...args: Parameters<OrderService['getOrderBookDetails']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getOrderBookDetails(...args);
    }
    async getOrderBookDetailsPerCurrency(
        ...args: Parameters<OrderService['getOrderBookDetailsPerCurrency']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getOrderBookDetailsPerCurrency(...args);
    }
    async getBestLendUnitPrices(
        ...args: Parameters<OrderService['getBestLendUnitPrices']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getBestLendUnitPrices(...args);
    }
    async getBestBorrowUnitPrices(
        ...args: Parameters<OrderService['getBestBorrowUnitPrices']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getBestBorrowUnitPrices(...args);
    }
    async getOrderBookId(...args: Parameters<OrderService['getOrderBookId']>) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getOrderBookId(...args);
    }
    async getOrderList(...args: Parameters<OrderService['getOrderList']>) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getOrderList(...args);
    }
    async getOrderFeeRate(
        ...args: Parameters<OrderService['getOrderFeeRate']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getOrderFeeRate(...args);
    }
    async getBorrowOrderBook(
        ...args: Parameters<OrderService['getBorrowOrderBook']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getBorrowOrderBook(...args);
    }
    async getLendOrderBook(
        ...args: Parameters<OrderService['getLendOrderBook']>
    ) {
        if (!this.orderService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.orderService.getLendOrderBook(...args);
    }

    // --- PositionService Delegation ---
    async getPositions(...args: Parameters<PositionService['getPositions']>) {
        if (!this.positionService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.positionService.getPositions(...args);
    }
    async getUsedCurrenciesForOrders(
        ...args: Parameters<PositionService['getUsedCurrenciesForOrders']>
    ) {
        if (!this.positionService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.positionService.getUsedCurrenciesForOrders(...args);
    }
    async unwindPosition(
        ...args: Parameters<PositionService['unwindPosition']>
    ) {
        if (!this.positionService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.positionService.unwindPosition(...args);
    }
    async getTotalPresentValueInBaseCurrency(
        ...args: Parameters<
            PositionService['getTotalPresentValueInBaseCurrency']
        >
    ) {
        if (!this.positionService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.positionService.getTotalPresentValueInBaseCurrency(...args);
    }
    async executeRepayment(
        ...args: Parameters<PositionService['executeRepayment']>
    ) {
        if (!this.positionService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.positionService.executeRepayment(...args);
    }
    async executeRedemption(
        ...args: Parameters<PositionService['executeRedemption']>
    ) {
        if (!this.positionService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.positionService.executeRedemption(...args);
    }
    async executeLiquidationCall(
        ...args: Parameters<PositionService['executeLiquidationCall']>
    ) {
        if (!this.positionService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.positionService.executeLiquidationCall(...args);
    }

    // --- MarketService Delegation ---
    async getLastPrice(...args: Parameters<MarketService['getLastPrice']>) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.getLastPrice(...args);
    }
    async getDecimals(...args: Parameters<MarketService['getDecimals']>) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.getDecimals(...args);
    }
    async isTerminated(...args: Parameters<MarketService['isTerminated']>) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.isTerminated(...args);
    }
    async getMarketTerminationDate(
        ...args: Parameters<MarketService['getMarketTerminationDate']>
    ) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.getMarketTerminationDate(...args);
    }
    async getMarketTerminationRatio(
        ...args: Parameters<MarketService['getMarketTerminationRatio']>
    ) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.getMarketTerminationRatio(...args);
    }
    async getMarketTerminationPriceAndDecimals(
        ...args: Parameters<
            MarketService['getMarketTerminationPriceAndDecimals']
        >
    ) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.getMarketTerminationPriceAndDecimals(...args);
    }
    async isRedemptionRequired(
        ...args: Parameters<MarketService['isRedemptionRequired']>
    ) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.isRedemptionRequired(...args);
    }
    async executeEmergencySettlement(
        ...args: Parameters<MarketService['executeEmergencySettlement']>
    ) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.executeEmergencySettlement(...args);
    }
    async getItayoseEstimation(
        ...args: Parameters<MarketService['getItayoseEstimation']>
    ) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.getItayoseEstimation(...args);
    }
    async getGenesisValue(
        ...args: Parameters<MarketService['getGenesisValue']>
    ) {
        if (!this.marketService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.marketService.getGenesisValue(...args);
    }

    // --- TokenService Delegation ---
    async mintERC20Token(...args: Parameters<TokenService['mintERC20Token']>) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.mintERC20Token(...args);
    }
    async getERC20TokenContractAddress(
        ...args: Parameters<TokenService['getERC20TokenContractAddress']>
    ) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.getERC20TokenContractAddress(...args);
    }
    async getERC20Balance(
        ...args: Parameters<TokenService['getERC20Balance']>
    ) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.getERC20Balance(...args);
    }
    async getERC20TokenBalance(
        ...args: Parameters<TokenService['getERC20TokenBalance']>
    ) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.getERC20TokenBalance(...args);
    }
    async getERC20TokenName(
        ...args: Parameters<TokenService['getERC20TokenName']>
    ) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.getERC20TokenName(...args);
    }
    async getUserNonceFromPermitToken(
        ...args: Parameters<TokenService['getUserNonceFromPermitToken']>
    ) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.getUserNonceFromPermitToken(...args);
    }
    async getZCToken(...args: Parameters<TokenService['getZCToken']>) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.getZCToken(...args);
    }
    async getWithdrawableZCTokenAmount(
        ...args: Parameters<TokenService['getWithdrawableZCTokenAmount']>
    ) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.getWithdrawableZCTokenAmount(...args);
    }
    async withdrawZCToken(
        ...args: Parameters<TokenService['withdrawZCToken']>
    ) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.withdrawZCToken(...args);
    }
    async depositZCToken(...args: Parameters<TokenService['depositZCToken']>) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.depositZCToken(...args);
    }
    async getCollateralCurrencies(
        ...args: Parameters<TokenService['getCollateralCurrencies']>
    ) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.getCollateralCurrencies(...args);
    }
    async getCurrencies(...args: Parameters<TokenService['getCurrencies']>) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.getCurrencies(...args);
    }
    async currencyExists(...args: Parameters<TokenService['currencyExists']>) {
        if (!this.tokenService) throw new Error(CLIENT_NOT_INITIALIZED);
        return this.tokenService.currencyExists(...args);
    }

    // ...keep only utility methods and logic not covered by services...
}
