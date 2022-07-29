import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { LoanV2 as Contract, LoanV2__factory as Factory } from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class Loan extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress('LoanV2', networkName);
        const contract = Factory.connect(address, signerOrProvider);

        return new Loan(contract);
    }
}

export default Loan;
