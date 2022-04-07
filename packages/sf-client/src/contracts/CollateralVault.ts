import { BigNumber, Contract, Signer } from 'ethers';
import CollateralVaultAbi from '../lib/abis/CollateralVault';
import { TxBase } from '../utils/eth-tx';
import { getCollateralVaultByCcy } from '../utils/addresses';
import { Provider } from '@ethersproject/providers';

export class CollateralVault {
    contract: Contract;

    constructor(
        ccy: string,
        signerOrProvider: Signer | Provider,
        network: number
    ) {
        let vault = getCollateralVaultByCcy(ccy, network);

        this.contract = new Contract(
            vault.address,
            CollateralVaultAbi,
            signerOrProvider
        );
    }

    deposit = async (amount: number | BigNumber, txParams?: TxBase) => {
        return await this.contract.functions['deposit(uint256)'](amount);
    };

    depositIntoPosition = async (
        counterparty: string,
        amount: number | BigNumber,
        txParams?: TxBase
    ) => {
        return await this.contract.functions['deposit(address,uint256)'](
            counterparty,
            amount
        );
    };

    withdraw = async (amount: number | BigNumber, txParams?: TxBase) => {
        return await this.contract.withdraw(amount, txParams);
    };

    withdrawFromPosition = async (
        counterparty: string,
        amount: number | BigNumber,
        txParams?: TxBase
    ) => {
        return await this.contract.withdrawFrom(counterparty, amount, txParams);
    };

    getIndependentCollateral = async (user: string) => {
        return await this.contract.getIndependentCollateral(user);
    };

    getIndependentCollateralInETH = async (user: string) => {
        return await this.contract.getIndependentCollateralInETH(user);
    };

    getLockedCollateral = async (user: string) => {
        return await this.contract.functions['getLockedCollateral(address)'](
            user
        );
    };

    getLockedCollateralFromPosition = async (
        user: string,
        counterparty: string
    ) => {
        return await this.contract.functions[
            'getLockedCollateral(address,address)'
        ](user, counterparty);
    };

    getLockedCollateralInETH = async (user: string) => {
        return await this.contract.functions[
            'getLockedCollateralInETH(address)'
        ](user);
    };

    getLockedCollateralFromPositionInETH = async (
        user: string,
        counterparty: string
    ) => {
        return await this.contract.functions[
            'getLockedCollateralInETH(address,address)'
        ](user, counterparty);
    };
}

export default CollateralVault;
