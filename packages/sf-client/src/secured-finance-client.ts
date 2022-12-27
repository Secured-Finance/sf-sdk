import { Network } from '@ethersproject/networks';
import { Provider } from '@ethersproject/providers';
import { Currency, Ether, Token } from '@secured-finance/sf-core';
import ERC20 from '@secured-finance/smart-contracts/build/contracts/mocks/tokens/MockERC20.sol/MockERC20.json';
import * as dayjs from 'dayjs';
import {
    BigNumber,
    constants,
    Contract,
    getDefaultProvider,
    Signer,
    utils,
} from 'ethers';
import { ContractsInstance } from './contracts-instance';
import { LendingMarketInfo, SecuredFinanceClientConfig } from './entities';
import { MockERC20 } from './types';
import { NetworkName, networkNames, sendEther } from './utils';

export enum OrderSide {
    LEND = '0',
    BORROW = '1',
}

type NonNullable<T> = T extends null | undefined ? never : T;
const CLIENT_NOT_INITIALIZED = 'Client is not initialized';

function assertNonNullish<TValue>(
    value: TValue | null,
    message = CLIENT_NOT_INITIALIZED
): asserts value is NonNullable<TValue> {
    if (!value) {
        throw new Error(message);
    }
}

export class SecuredFinanceClient extends ContractsInstance {
    private convertCurrencyToBytes32(ccy: Currency) {
        if (ccy.isNative) {
            return utils.formatBytes32String(ccy.symbol);
        } else {
            return utils.formatBytes32String(ccy.wrapped.symbol);
        }
    }

    private _config: SecuredFinanceClientConfig | null = null;

    ether: Ether | null = null;

    async init(
        signerOrProvider: Signer | Provider,
        network: Network,
        options?: {
            defaultGas?: number;
            defaultGasPrice?: number;
        }
    ) {
        const networkName = network.name as NetworkName;

        if (!networkNames.includes(networkName)) {
            throw new Error(`${networkName} is not supported.`);
        }

        this._config = {
            defaultGas: options?.defaultGas || 6000000,
            defaultGasPrice: options?.defaultGasPrice || 1000000000000,
            networkId: network.chainId,
            network: networkName,
            signerOrProvider: signerOrProvider || getDefaultProvider(),
        };
        await super.getInstances(signerOrProvider, networkName);
    }

    /**
     * Deposit collateral into the vault.
     *
     * @param ccy the collateral currency to deposit
     * @param amount the amount of collateral to deposit
     * @returns a `ContractTransaction`
     * @throws if the client is not initialized
     */
    async depositCollateral(
        ccy: Currency,
        amount: number | BigNumber,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        assertNonNullish(this.config);
        assertNonNullish(this.tokenVault);

        const isApproved = await this.approveTokenTransfer(ccy, amount);
        await onApproved?.(isApproved);

        const payableOverride = ccy.equals(Ether.onChain(this.config.networkId))
            ? { value: amount }
            : {};
        return this.tokenVault.contract.deposit(
            this.convertCurrencyToBytes32(ccy),
            amount,
            payableOverride
        );
    }

    async withdrawCollateral(ccy: Currency, amount: number | BigNumber) {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.contract.withdraw(
            this.convertCurrencyToBytes32(ccy),
            amount
        );
    }

    async getLendUnitPrices(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getLendUnitPrices(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getBorrowUnitPrices(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getBorrowUnitPrices(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getMidUnitPrices(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getMidUnitPrices(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getMaturities(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getMaturities(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getLendingMarkets(ccy: Currency): Promise<LendingMarketInfo[]> {
        assertNonNullish(this.lendingMarketController);
        const ccyIdentifier = this.convertCurrencyToBytes32(ccy);
        const lendingMarketAddresses =
            await this.lendingMarketController.contract.getLendingMarkets(
                ccyIdentifier
            );
        return Promise.all(
            lendingMarketAddresses.map(async address => {
                assertNonNullish(this.lendingMarkets);
                const lendingMarket = await this.lendingMarkets.get(address);
                const marketInfo = await lendingMarket.contract.getMarket();
                return {
                    midUnitPrice: marketInfo.midUnitPrice,
                    lendUnitPrice: marketInfo.lendUnitPrice,
                    borrowUnitPrice: marketInfo.borrowUnitPrice,
                    maturity: marketInfo.maturity.toNumber(),
                    name: dayjs
                        .unix(marketInfo.maturity.toNumber())
                        .format('MMMYY')
                        .toUpperCase(),
                };
            })
        );
    }

    /**
     *
     * @param ccy the Currency object of the selected market
     * @param maturity the maturity of the selected market
     * @param side Order position type, 0 for lend, 1 for borrow
     * @param amount Amount of funds the maker wants to borrow/lend
     * @param unitPrice Unit price the taker is willing to pay/receive. 0 for placing a market order
     * @param onApproved callback function to be called after the approval transaction is mined
     * @returns a `ContractTransaction`
     */
    async placeLendingOrder(
        ccy: Currency,
        maturity: number,
        side: OrderSide,
        amount: number | BigNumber,
        unitPrice?: number,
        onApproved?: (isApproved: boolean) => Promise<void> | void
    ) {
        assertNonNullish(this.lendingMarketController);
        if (side === OrderSide.LEND) {
            if (ccy.equals(Ether.onChain(this.config.networkId))) {
                return this.lendingMarketController.contract.depositAndCreateLendOrderWithETH(
                    this.convertCurrencyToBytes32(ccy),
                    maturity,
                    unitPrice ?? 0,
                    { value: amount }
                );
            } else {
                const isApproved = await this.approveTokenTransfer(ccy, amount);
                await onApproved?.(isApproved);
                return this.lendingMarketController.contract.depositAndCreateOrder(
                    this.convertCurrencyToBytes32(ccy),
                    maturity,
                    side,
                    amount,
                    unitPrice ?? 0
                );
            }
        } else {
            return this.lendingMarketController.contract.createOrder(
                this.convertCurrencyToBytes32(ccy),
                maturity,
                side,
                amount,
                unitPrice ?? 0
            );
        }
    }

    async cancelLendingOrder(
        ccy: Currency,
        maturity: number,
        orderID: number | BigNumber
    ) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.cancelOrder(
            this.convertCurrencyToBytes32(ccy),
            maturity,
            orderID
        );
    }

    async sendEther(
        amount: number | BigNumber,
        to: string,
        gasPrice?: number | BigNumber
    ) {
        let signer: Signer;
        assertNonNullish(this.config, 'Client is not initialized');

        if (Signer.isSigner(this.config.signerOrProvider)) {
            signer = this.config.signerOrProvider;
        } else {
            console.error('signer is required for sending transaction');
            return;
        }

        return sendEther(signer, amount, to, gasPrice);
    }

    async convertToETH(ccy: Currency, amount: number | BigNumber) {
        assertNonNullish(this.lendingMarketController);
        return this.currencyController?.contract[
            'convertToETH(bytes32,int256)'
        ](this.convertCurrencyToBytes32(ccy), amount);
    }

    async getCollateralBook(account: string, ccy: Currency) {
        assertNonNullish(this.tokenVault);
        const ccyIdentifier = this.convertCurrencyToBytes32(ccy);
        const [collateralAmount, collateralCoverage] = await Promise.all([
            this.tokenVault.contract.getDepositAmount(account, ccyIdentifier),
            this.tokenVault.contract.getCoverage(account),
        ]);

        return {
            collateralAmount,
            collateralCoverage,
        };
    }

    async getUsedCurrencies(account: string) {
        assertNonNullish(this.tokenVault);
        return this.tokenVault.contract.getUsedCurrencies(account);
    }

    async getTokenAllowance(token: Token, owner: string) {
        assertNonNullish(this.tokenVault);

        const tokenContract = await this.getTokenContract(token);
        const spender = this.tokenVault.contract.address;
        return tokenContract.allowance(owner, spender);
    }

    async getBorrowOrderBook(
        currency: Currency,
        maturity: number,
        limit: number
    ) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getBorrowOrderBook(
            this.convertCurrencyToBytes32(currency),
            maturity,
            limit
        );
    }

    async getLendOrderBook(
        currency: Currency,
        maturity: number,
        limit: number
    ) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getLendOrderBook(
            this.convertCurrencyToBytes32(currency),
            maturity,
            limit
        );
    }

    // Mock ERC20 token related functions
    async mintERC20Token(token: Token) {
        assertNonNullish(this.tokenFaucet);
        return this.tokenFaucet.contract.mint(
            this.convertCurrencyToBytes32(token)
        );
    }

    async getERC20TokenContractAddress(token: Token) {
        assertNonNullish(this.tokenFaucet);
        return this.tokenFaucet.contract.getCurrencyAddress(
            this.convertCurrencyToBytes32(token)
        );
    }

    get config() {
        assertNonNullish(this._config);
        return this._config;
    }

    private async approveTokenTransfer(
        ccy: Currency,
        amount: number | BigNumber
    ) {
        assertNonNullish(this.tokenVault);
        if (!(this.config.signerOrProvider instanceof Signer)) {
            throw new Error('Signer is not set');
        }

        if (ccy instanceof Token) {
            const tokenContract = await this.getTokenContract(ccy);
            const owner = await this.config.signerOrProvider.getAddress();
            const spender = this.tokenVault.contract.address;
            const allowance = await tokenContract.allowance(owner, spender);

            if (allowance.lte(amount)) {
                await tokenContract
                    .approve(spender, constants.MaxUint256.sub(amount))
                    .then(tx => tx.wait());
                return true;
            }
        }
        return false;
    }

    private async getTokenContract(token: Token) {
        return new Contract(
            token.address,
            ERC20.abi,
            this.config.signerOrProvider
        ) as MockERC20;
    }
}
