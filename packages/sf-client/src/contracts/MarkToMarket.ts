import { Contract } from 'ethers';
import MarkToMarketAbi from '../lib/abis/MarkToMarket';
import { addresses } from '../lib/addresses';
import { TxBase } from '../utils/eth-tx';
import { SignerOrProvider } from '../utils';

export class MarkToMarket {
    contract: Contract;

    constructor(signerOrProvider: SignerOrProvider, network: number) {
        this.contract = new Contract(
            addresses[network].markToMarket,
            MarkToMarketAbi,
            signerOrProvider
        );
    }

    updatePV = async (dealId: string, txParams?: TxBase) => {
        return await this.contract.updatePV(dealId, txParams);
    };

    updatePVs = async (dealIds: string[], txParams?: TxBase) => {
        return await this.contract.updatePVs(dealIds);
    };
}

export default MarkToMarket;
