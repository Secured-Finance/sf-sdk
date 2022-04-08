import { Contract, Signer } from 'ethers';
import ProductAddressResolverAbi from '../lib/abis/ProductAddressResolver';
import { addresses } from '../lib/addresses';
import { Provider } from '@ethersproject/providers';

export class ProductAddressResolver {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].productAddressResolver,
            ProductAddressResolverAbi,
            signerOrProvider
        );
    }

    getProductContract = async (prefix: string) => {
        return this.contract.getProductContract(prefix);
    };

    getProductContractByDealId = async (dealID: string) => {
        return this.contract.getProductContractByDealId(dealID);
    };

    getControllerContract = async (prefix: string) => {
        return this.contract.getControllerContract(prefix);
    };

    getControllerContractByDealId = async (dealID: string) => {
        return this.contract.getControllerContractByDealId(dealID);
    };

    isSupportedProduct = async (prefix: string) => {
        return this.contract.isSupportedProduct(prefix);
    };

    isSupportedProductByDealId = async (dealID: string) => {
        return this.contract.isSupportedProductByDealId(dealID);
    };
}

export default ProductAddressResolver;
