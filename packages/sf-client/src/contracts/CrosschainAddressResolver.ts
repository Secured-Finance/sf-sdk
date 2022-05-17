import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    CrosschainAddressResolver as Contract,
    CrosschainAddressResolver__factory,
} from '../../types/ethers-contracts';
import { addresses } from '../lib/addresses';

export class CrosschainAddressResolver {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = CrosschainAddressResolver__factory.connect(
            addresses[network].crosschainAddressResolver,
            signerOrProvider
        );
    }

    updateAddress = async (
        user: string,
        chainId: (number | string)[],
        address: string[]
    ) => {
        return this.contract.updateAddresses(user, chainId, address);
    };

    getUserAddress = async (user: string, chainId: number | string) => {
        return this.contract.getUserAddress(user, chainId);
    };
}

export default CrosschainAddressResolver;
