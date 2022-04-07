import { Contract, Overrides, Signer } from 'ethers';
import MarkToMarketAbi from '../lib/abis/MarkToMarket';
import { addresses } from '../lib/addresses';
import { TxBase } from '../utils/eth-tx';
import { Provider } from '@ethersproject/providers';

export class MarkToMarket {
    contract: Contract;

    constructor(signerOrProvider: Signer | Provider, network: number) {
        this.contract = new Contract(
            addresses[network].markToMarket,
            MarkToMarketAbi,
            signerOrProvider
        );
    }

    updatePV = async (dealId: string, options?: Overrides) => {
        return this.contract.updatePV(dealId, options);
    };

    updatePVs = async (dealIds: string[], options?: Overrides) => {
        return this.contract.updatePVs(dealIds, options);
    };
}

export default MarkToMarket;
