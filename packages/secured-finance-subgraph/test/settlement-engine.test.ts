import { assert, logStore, test } from "matchstick-as/assembly/index"
import { Address, log, BigInt, Bytes, crypto, ByteArray } from "@graphprotocol/graph-ts"
import { createCrosschainSettlementRequestedEvent, createCrosschainSettlementRequestFulfilledEvent } from "./mocks/settlement-engine"
import { handleCrosschainSettlementRequest, handleFulfillCrosschainSettlementRequest } from "../src/settlement-engine"
export { handleCrosschainSettlementRequest, handleFulfillCrosschainSettlementRequest }

const user = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');
const counterparty = Address.fromString('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
const chainId = 461;
const txHash = '0xTest';
const requestId = Bytes.fromByteArray(
    crypto.keccak256(ByteArray.fromI32(chainId))
);
const paymentAmount = BigInt.fromI32(25000);

let timestamp: BigInt;

const userCrosschainAddress = 'f2ujkdpilen762ktpwksq3vfmre4dpekpgaplcvty'
const counterpartyCrosschainAddress = 'f2ujkdpilen762ktpwksq3vfmre4dpekpafsfalcvty'

test("Should create new crosschain settlement request and validate the state", () => {
    let event = createCrosschainSettlementRequestedEvent(
        user,
        counterparty,
        chainId,
        txHash,
        requestId
    );
    handleCrosschainSettlementRequest(event);

    timestamp = event.params.timestamp;

    assert.fieldEquals(
        'CrosschainSettlementRequest',
        txHash,
        'requestId',
        requestId.toHex()
    )

    assert.fieldEquals(
        'CrosschainSettlementRequest',
        txHash,
        'payer',
        user.toHex()
    )

    assert.fieldEquals(
        'CrosschainSettlementRequest',
        txHash,
        'receiver',
        counterparty.toHex()
    )

    assert.fieldEquals(
        'CrosschainSettlementRequest',
        txHash,
        'timestamp',
        timestamp.toString()
    )
})

test("Should verify existing crosschain settlement request, and validate state", () => {
    const settlementId = Bytes.fromByteArray(crypto.keccak256(ByteArray.fromHexString(txHash)));
    let event = createCrosschainSettlementRequestFulfilledEvent(
        userCrosschainAddress,
        counterpartyCrosschainAddress,
        chainId,
        paymentAmount,
        timestamp,
        txHash,
        settlementId
    );
    handleFulfillCrosschainSettlementRequest(event);

    assert.fieldEquals(
        'CrosschainSettlementRequest',
        txHash,
        'paymentConfirmation',
        settlementId.toHex()
    )

    assert.fieldEquals(
        'CrosschainSettlementRequest',
        txHash,
        'amount',
        paymentAmount.toString()
    )

    assert.fieldEquals(
        'CrosschainSettlementRequest',
        txHash,
        'crosschainPayerAddress',
        userCrosschainAddress.toString()
    )

    assert.fieldEquals(
        'CrosschainSettlementRequest',
        txHash,
        'crosschainReceiverAddress',
        counterpartyCrosschainAddress.toString()
    )
})