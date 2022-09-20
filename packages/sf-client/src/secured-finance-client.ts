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
import { MockERC20 } from './types';

import { ContractsInstance } from './contracts-instance';
import { NetworkName, networkNames, sendEther } from './utils';

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

export interface SecuredFinanceClientConfig {
    defaultGas: number;
    defaultGasPrice: number;
    network: string;
    networkId: number;
    signerOrProvider: Signer | Provider;
}

export interface LendingMarketInfo {
    maturity: number;
    name: string;
    lendRate: BigNumber;
    borrowRate: BigNumber;
    midRate: BigNumber;
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
        options?: { defaultGas?: number; defaultGasPrice?: number }
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
    async depositCollateral(ccy: Currency, amount: number | BigNumber) {
        assertNonNullish(this.config);
        assertNonNullish(this.tokenVault);

        await this.approveTokenTransfer(ccy, amount);
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

    async getBorrowYieldCurve(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getBorrowRates(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getLendYieldCurve(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getLendRates(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getMidRateYieldCurve(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getMidRates(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getMaturities(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getMaturities(
            this.convertCurrencyToBytes32(ccy)
        );
    }

    async getTotalBorrowingAmount(ccy: Currency) {
        assertNonNullish(this.lendingMarketController);
        return this.lendingMarketController.contract.getTotalBorrowingSupply(
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
                    midRate: marketInfo.midRate,
                    lendRate: marketInfo.lendRate,
                    borrowRate: marketInfo.borrowRate,
                    maturity: marketInfo.maturity.toNumber(),
                    name: dayjs
                        .unix(marketInfo.maturity.toNumber())
                        .format('MMMYY')
                        .toUpperCase(),
                };
            })
        );
    }

    async placeLendingOrder(
        ccy: Currency,
        maturity: number | BigNumber,
        side: string,
        amount: number | BigNumber,
        rate: number | BigNumber
    ) {
        assertNonNullish(this.lendingMarketController);
        if (ccy.equals(Ether.onChain(this.config.networkId)) && side === '0') {
            return this.lendingMarketController.contract.createLendOrderWithETH(
                this.convertCurrencyToBytes32(ccy),
                maturity,
                rate,
                { value: amount }
            );
        } else {
            await this.approveTokenTransfer(ccy, amount);
            return this.lendingMarketController.contract.createOrder(
                this.convertCurrencyToBytes32(ccy),
                maturity,
                side,
                amount,
                rate
            );
        }
    }

    async cancelLendingOrder(
        ccy: Currency,
        maturity: number | BigNumber,
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
            this.tokenVault.contract.getCollateralAmountInETH(
                account,
                ccyIdentifier
            ),
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
                await tokenContract.approve(
                    spender,
                    constants.MaxUint256.sub(amount)
                );
            }
        }
    }

    private async getTokenContract(token: Token) {
        return new Contract(
            token.address,
            ERC20.abi,
            this.config.signerOrProvider
        ) as MockERC20;
    }
}
