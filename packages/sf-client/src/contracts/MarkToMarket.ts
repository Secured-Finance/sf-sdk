import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { addresses } from '../lib/addresses';
import { MarkToMarket as Contract, MarkToMarket__factory } from '../types';

export class MarkToMarket {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = MarkToMarket__factory.connect(
            addresses[network].markToMarket,
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
