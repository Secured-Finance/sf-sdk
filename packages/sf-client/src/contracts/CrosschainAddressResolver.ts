import { Contract } from 'ethers';
import CrosschainAddressResolverAbi from '../lib/abis/CrosschainAddressResolver';
import { addresses } from '../lib/addresses';
import { SignerOrProvider } from '../utils';

export class CrosschainAddressResolver {
    contract: Contract;

    constructor(signerOrProvider: SignerOrProvider, network: number) {
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
        return await this.contract.functions['updateAddress(uint256,string)'](
            chainId,
            address
        );
    };

    getUserAddress = async (
        user: string,
        chainId: number | string | BigInt
    ) => {
        return await this.contract.getUserAddress(user, chainId);
    };
}

export default CrosschainAddressResolver;
