import { renderHook } from '@testing-library/react-hooks';
import { expect } from 'chai';
import {
    useCrosschainAddressById,
    useCrosschainAddressesByUser,
} from '../../src/hooks';
import { crosschainChainId, validateCrosschainAddress } from '../utils';

const user = '0x57ab42d4fa756b6956b0caf986a5f53ba90d9e28';

describe('useCrosschainAddressById hook test', () => {
    it('Should get data existing cross chain addresses for a specific user from subgraph', async () => {
        const { result } = renderHook(() =>
            useCrosschainAddressById(user, crosschainChainId)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.crosschainAddress != undefined) {
            const crosschainAddress = result.current.data.crosschainAddress;
            validateCrosschainAddress(crosschainAddress);
        }
    });

    it("Should return all cross chain addresses if user's address is empty", async () => {
        const { result } = renderHook(() =>
            useCrosschainAddressById('', crosschainChainId)
        );

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data?.crosschainAddress).to.be.undefined;
    });
});

describe('useCrosschainAddressesByUser hook test', () => {
    it('Should get data existing cross chain addresses for a specific user from subgraph', async () => {
        const { result } = renderHook(() => useCrosschainAddressesByUser(user));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        if (result.current.data?.crosschainAddresses != undefined) {
            const crosschainAddresses = result.current.data.crosschainAddresses;

            for (let i = 0; i < crosschainAddresses.length; i++) {
                validateCrosschainAddress(crosschainAddresses[i]);
            }
        }
    });

    it("Should return all cross chain addresses if user's address is empty", async () => {
        const { result } = renderHook(() => useCrosschainAddressesByUser(''));

        await new Promise<void>(res =>
            setTimeout(() => {
                res();
            }, 1000)
        );

        expect(result.current.data?.crosschainAddresses).to.not.be.empty;
    });
});
