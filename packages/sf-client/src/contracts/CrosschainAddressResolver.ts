import { Contract, Signer } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import CrosschainAddressResolverAbi from '../lib/abis/CrosschainAddressResolver';
import { addresses } from '../lib/addresses';

export class CrosschainAddressResolver {
    contract: Contract;

    constructor(signerOrProvider: Signer | BaseProvider, network: number) {
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
        return await this.contract.functions['updateAddress(uint256,string)'](chainId, address);
    };

    getUserAddress = async (user: string, chainId: number | string | BigInt) => {
        return await this.contract.getUserAddress(user, chainId);
    };
}

export default CrosschainAddressResolver;
