import { Wallet, getDefaultProvider } from 'ethers';
import { BaseProvider } from '@ethersproject/providers';
import { DEFAULT_CHAIN_ID, DEFAULT_MNEMONIC } from './constants';
import { NETWORKS } from './networks';
import * as fs from "fs";
import { getProvider } from './providers';

export const privateKeySigner = function(privateKey: string, provider?: BaseProvider, networkId?: number): Wallet {
    if (!provider && networkId) {
        provider = getProvider(NETWORKS[networkId]);
    }

    return new Wallet(privateKey, provider);
};

export const readPrivateKey = (file: string, networkId: number = DEFAULT_CHAIN_ID): Wallet => {
    const privateKey = JSON.parse(fs.readFileSync(file).toString("utf-8"));
    const provider = getDefaultProvider(NETWORKS[networkId]);

    return new Wallet(privateKey, provider);
}

export const mnemonicSigner = function(mnemonic: string = DEFAULT_MNEMONIC, provider?: BaseProvider, networkId?: number): Wallet {
    let signer = Wallet.fromMnemonic(mnemonic);

    if (provider) {
        signer = signer.connect(provider);
    } else if (!provider && networkId) {
        provider = getProvider(NETWORKS[networkId]);
        signer = signer.connect(provider);
    }

    return signer;
};
