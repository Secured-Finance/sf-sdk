import { Currency, Token } from '@secured-finance/sf-core';
import { PublicClient, WalletClient, Address, Hex, stringToHex } from 'viem';
import { SecuredFinanceClientConfig } from '../entities';
import { TokenVault } from '../contracts/TokenVault';
import {
    getTokenFaucetContract,
    getTokenVaultContract,
    getLendingMarketControllerContract,
    getCurrencyControllerContract,
} from '../contracts';
import { ERC20Abi } from '../ERC20Abi';
import { ERC20PermitAbi } from '../ERC20PermitAbi';

export class TokenService {
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
            gas: (estimatedGas * 11n) / 10n,
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
            gas: (estimatedGas * 11n) / 10n,
        });
    }

    async getCollateralCurrencies() {
        return this.publicClient.readContract({
            ...getTokenVaultContract(this.config.env),
            functionName: 'getCollateralCurrencies',
        });
    }

    async getCurrencies() {
        return this.publicClient.readContract({
            ...getCurrencyControllerContract(this.config.env),
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
}
