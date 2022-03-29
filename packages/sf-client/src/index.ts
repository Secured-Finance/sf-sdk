import { SFClient } from './SF-Client';
import { utils, Wallet } from 'ethers';
import * as util from './utils';
import { BaseProvider } from '@ethersproject/providers';

export class SecuredFinanceClient extends SFClient {
    utils: any;
    util: any;

    /**
     * Creates an instance for accessing Secured Finance protocol on Ethereum chain.
     * Usage example:
     * const {SecuredFinanceClient} = require('SecuredFinanceClient');
     * const sfClient = new SecuredFinanceClient();
     * @constructor
     * @param provider {Ethers provider, default on mainnet}
     * @param wallet {Ethers wallet instance}
     * @notice utils {Ethers utils}
     */
    constructor(
        provider: BaseProvider,
        wallet?: Wallet,
        options?: { defaultGas?: number; defaultGasPrice?: any }
    ) {
        super(provider, wallet, options);
        this.utils = utils;
        this.util = util;
    }
}
