import { SFClient } from './SF-Client';
import { utils as ethersUtils, Wallet } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';

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
        wallet?: Wallet,
        options?: { defaultGas?: number; defaultGasPrice?: any }
    ) {
        super(provider, wallet, options);
        this.ethersUtils = ethersUtils;
        this.utils = utils;
    }
}
