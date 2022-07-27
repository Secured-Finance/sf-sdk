import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    CrosschainAddressResolver as Contract,
    CrosschainAddressResolver__factory as Factory,
} from '../types';
import { BaseContract } from './base-contract';

export class CrosschainAddressResolver extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        network: string
    ) {
        const address = await this.getAddress(
            'CrosschainAddressResolver',
            network
        );
        const contract = Factory.connect(address, signerOrProvider);

        return new CrosschainAddressResolver(contract);
    }

    updateAddress = async (chainId: number | string, address: string) => {
        return this.contract['updateAddress(uint256,string)'](chainId, address);
    };

    getUserAddress = async (user: string, chainId: number | string) => {
        return this.contract.getUserAddress(user, chainId);
    };
}

export default CrosschainAddressResolver;
