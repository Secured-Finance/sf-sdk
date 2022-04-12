import { Contract, Overrides, Signer } from 'ethers';
import CrosschainAddressResolverAbi from '../lib/abis/CrosschainAddressResolver';
import { addresses } from '../lib/addresses';
import { Provider } from '@ethersproject/providers';

export class CrosschainAddressResolver {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].crosschainAddressResolver,
            CrosschainAddressResolverAbi,
            signerOrProvider
        );
    }

    updateAddress = async (
        chainId: number | string | BigInt,
        address: string
    ) => {
        return this.contract.functions['updateAddress(uint256,string)'](
            chainId,
            address
        );
    };

    getUserAddress = async (
        user: string,
        chainId: number | string | BigInt
    ) => {
        return this.contract.getUserAddress(user, chainId);
    };
}

export default CrosschainAddressResolver;
