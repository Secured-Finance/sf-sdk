import { Contract, Signer} from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import MarkToMarketAbi from "../lib/abis/MarkToMarket";
import { addresses } from '../lib/addresses';
import { TxBase } from '../utils/eth-tx';

export class MarkToMarket {
    contract: Contract;
    
    constructor(signerOrProvider: Signer | BaseProvider, network: number) {
        this.contract = new Contract(
            addresses[network].markToMarket,
            MarkToMarketAbi,
            signerOrProvider,
        );
    }

    updatePV = async (dealId: string, txParams?: TxBase) => {
        return await this.contract.updatePV(dealId, txParams);
    }

    updatePVs = async (dealIds: string[], txParams?: TxBase) => {
        return await this.contract.updatePVs(dealIds);
    }

}

export default MarkToMarket