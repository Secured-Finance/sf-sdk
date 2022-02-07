import { utils } from 'ethers';

export const packAddresses = (address0: string, address1: string) => {
    let encodedAddrs: string;
    let packed: string;
    let _address0: string, _address1: string;
    
    address0 < address1 ? (_address0 = address0, _address1 = address1) : (_address0 = address1, _address1 = address0);

    if (_address0 != address0) {
        encodedAddrs = utils.defaultAbiCoder.encode([ "address", "address" ], [ _address0, _address1 ]);
        packed = utils.keccak256(encodedAddrs);
        return [packed, true];
    } else {
        encodedAddrs = utils.defaultAbiCoder.encode([ "address", "address" ], [ _address0, _address1 ]);
        packed = utils.keccak256(encodedAddrs);
        return [packed, false];
    }
}
