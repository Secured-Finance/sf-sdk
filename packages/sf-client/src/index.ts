import { SFClient } from './SF-Client';
import { Signer, utils as ethersUtils } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import { Network } from '@ethersproject/networks';

import * as utils from './utils';
export { utils };

export class SecuredFinanceClient extends SFClient {
    ethersUtils: any;
    utils: any;

    /**
     * Creates an instance for accessing Secured Finance protocol on Ethereum chain.
     * Usage example:
     * const {SecuredFinanceClient} = require('SecuredFinanceClient');
     * const sfClient = new SecuredFinanceClient();
     * @constructor
     * @param provider {Ethers provider, default on mainnet}
     * @param wallet {Ethers wallet instance}
     * @notice ethersUtils {Ethers utils}
     */
    constructor(
        provider: BaseProvider,
        wallet?: Signer,
        network?: Network,
        options?: { defaultGas?: number; defaultGasPrice?: any }
    ) {
        super(provider, wallet, network, options);
        this.ethersUtils = ethersUtils;
        this.utils = utils;
    }
}
