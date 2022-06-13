import { assert, logStore, test } from "matchstick-as/assembly/index"
import { Address, log, BigInt } from "@graphprotocol/graph-ts"

import { createUpdateCrosschainAddressEvent } from "./mocks/cross-chain-addresses"
import { handleCrosschainAddressUpdate } from "../src/crosschain-address-resolver"
import { toBytes32 } from "./utils/string"
export { handleCrosschainAddressUpdate }

const user = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');
const chainId = BigInt.fromI32(461);
const crosschainAddressId = user.toHex() + '-' + chainId.toString();

const counterparty = Address.fromString('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
const currencyIdentifier = toBytes32('ETH');

test("Should register new cross chain address for user, validate state", () => {
    const crosschainAddress = 'dummy address';
    let event = createUpdateCrosschainAddressEvent(
        user,
        chainId,
        crosschainAddress,
    );
    handleCrosschainAddressUpdate(event);

    assert.fieldEquals(
        'CrosschainAddress',
        crosschainAddressId,
        'chainId',
        chainId.toString()
    )

    assert.fieldEquals(
        'CrosschainAddress',
        crosschainAddressId,
        'address',
        crosschainAddress
    )
})

test("Should update existing cross chain address for user, validate state", () => {
    const crosschainAddress = 'second dummy crosschain address';
    let event = createUpdateCrosschainAddressEvent(
        user,
        chainId,
        crosschainAddress,
    );
    handleCrosschainAddressUpdate(event);

    assert.fieldEquals(
        'CrosschainAddress',
        crosschainAddressId,
        'address',
        crosschainAddress
    )
})
