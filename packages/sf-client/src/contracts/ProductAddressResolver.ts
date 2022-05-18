import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import {
    ProductAddressResolver as Contract,
    ProductAddressResolver__factory,
} from '../../types/ethers-contracts';
import { addresses } from '../lib/addresses';

export class ProductAddressResolver {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = ProductAddressResolver__factory.connect(
            addresses[network].productAddressResolver,
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
