import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    ProductAddressResolver as Contract,
    ProductAddressResolver__factory as Factory,
} from '../types';
import { NetworkName } from '../utils';
import { BaseContract } from './base-contract';

export class ProductAddressResolver extends BaseContract<Contract> {
    static async getInstance(
        signerOrProvider: Signer | Provider,
        networkName: NetworkName
    ) {
        const address = await this.getAddress(
            'ProductAddressResolver',
            networkName
        );
        const contract = Factory.connect(address, signerOrProvider);

        return new ProductAddressResolver(contract);
    }
}

export default ProductAddressResolver;
