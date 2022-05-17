import { Network, Provider } from '@ethersproject/providers';
import { Signer, utils as ethersUtils } from 'ethers';
import { SFClient } from './SF-Client';
import * as utils from './utils';

export { utils };

export class SecuredFinanceClient extends SFClient {
    ethersUtils: typeof ethersUtils;
    utils: typeof utils;

    /**
     * Creates an instance for accessing Secured Finance protocol on Ethereum chain.
     * Usage example:
     * const {SecuredFinanceClient} = require('SecuredFinanceClient');
     * const sfClient = new SecuredFinanceClient();
     * @constructor
     * @param signerOrProvider {Ethers provider or signer}
     * @param network {Ethers provider network object}
     * @notice ethersUtils {Ethers utils}
     */
    constructor(
        signerOrProvider: Signer | Provider,
        network?: Network,
        options?: { defaultGas?: number; defaultGasPrice?: number }
    ) {
        super(signerOrProvider, network, options);
        this.ethersUtils = ethersUtils;
        this.utils = utils;
    }
}
