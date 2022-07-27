import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { LoanV2 as Contract, LoanV2__factory as Factory } from '../types';
import { BaseContract } from './BaseContract';

export class Loan extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        network: string
    ) {
        const address = await this.getAddress('LoanV2', network);
        const contract = Factory.connect(address, signerOrProvider);

        return new Loan(contract);
    }
}

export default Loan;
