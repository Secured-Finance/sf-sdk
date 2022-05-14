import { Provider } from '@ethersproject/providers';
import { Contract, Signer } from 'ethers';
import MarkToMarketAbi from '../lib/abis/MarkToMarket';
import { addresses } from '../lib/addresses';

export class MarkToMarket {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].markToMarket,
            MarkToMarketAbi,
            signerOrProvider
        );
    }

    updatePV = async (dealId: string) => {
        return this.contract.updatePV(dealId);
    };

    updatePVs = async (dealIds: string[]) => {
        return this.contract.updatePVs(dealIds);
    };
}

export default MarkToMarket;
