import { BigNumber, Contract, Signer} from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import CollateralVaultAbi from "../lib/abis/CollateralVault";
import { TxBase } from '../utils/eth-tx';
import { getCollateralVaultByCcy } from '../utils/addresses';

export class CollateralVault {
    contract: Contract;
    
    constructor(
        ccy: string,
        signerOrProvider: Signer | BaseProvider, 
        network: number
    ) {
        let vault = getCollateralVaultByCcy(ccy, network);

        this.contract = new Contract(
            vault.address,
            CollateralVaultAbi,
            signerOrProvider,
        );
    }

    deposit = async (amount: number | BigNumber, txParams?: TxBase) => {
        return await this.contract.functions['deposit(uint256)'](amount);
    }

    depositIntoPosition = async (counterparty: string, amount: number | BigNumber, txParams?: TxBase) => {
        return await this.contract.functions['deposit(address,uint256)'](counterparty, amount);
    }

    withdraw = async (amount: number | BigNumber, txParams?: TxBase) => {
        return await this.contract.withdraw(amount, txParams);
    }

    withdrawFromPosition = async (counterparty: string, amount: number | BigNumber, txParams?: TxBase) => {
        return await this.contract.withdrawFrom(counterparty, amount, txParams);
    }

    getIndependentCollateral = async(user: string) => {
        return await this.contract.getIndependentCollateral(user);
    }

    getIndependentCollateralInETH = async(user: string) => {
        return await this.contract.getIndependentCollateralInETH(user);
    }

    getLockedCollateral = async(user: string) => {
        return await this.contract.getLockedCollateral(user);
    }

    getLockedCollateralInETH = async(user: string) => {
        return await this.contract.getLockedCollateralInETH(user);
    }

    getLockedCollateralFromPosition = async(party0: string, party1: string) => {
        return await this.contract.getLockedCollateral(party0, party1);
    }

    getLockedCollateralFromPositionInETH = async(party0: string, party1: string) => {
        return await this.contract.getLockedCollateralInETH(party0, party1);
    }

}

export default CollateralVault;