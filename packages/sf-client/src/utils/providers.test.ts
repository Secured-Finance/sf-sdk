import { BaseProvider, JsonRpcProvider } from '@ethersproject/providers';
import { getLocalhostProvider, getProvider } from './providers';

describe('Check ethers provider', function () {
    let provider: BaseProvider;
    const mainnetNetworkID = 1;
    const ropstenNetworkID = 3;

    it('Try connect to mainnet ethers provider, check network ID', async () => {
        provider = getProvider('mainnet');
        const networkId = await (await provider.getNetwork()).chainId;
        expect(networkId).toEqual(mainnetNetworkID);
    });

    it('Try connect to ropsten ethers provider, check network ID', async () => {
        provider = getProvider('ropsten');
        const networkId = await (await provider.getNetwork()).chainId;
        expect(networkId).toEqual(ropstenNetworkID);
    });

    it('Try connect to localhost provider, check connection URL', async () => {
        const provider: JsonRpcProvider = getLocalhostProvider();
        expect(provider.connection.url).toEqual('http://localhost:8545');
    });
});
