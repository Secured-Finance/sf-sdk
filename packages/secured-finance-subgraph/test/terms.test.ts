import { assert, test } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"

import { createProductTermSupportUpdatedEvent, createTermAddedEvent } from "./mocks/terms"
import { handleNewTerm, handleTermProductSupport } from "../src/terms"
import { createCurrencyEntity, createProductEntity } from "./utils/entities"
import { toBytes32 } from "./utils/string"
export { handleNewTerm, handleTermProductSupport }

test("Should create new term for 90 days, and validate term data", () => {
    const numOfDays = BigInt.fromI32(90)

    let termAddedEvent = createTermAddedEvent(numOfDays);
    handleNewTerm(termAddedEvent)

    assert.fieldEquals(
        'Term',
        numOfDays.toHexString(),
        'daysNum',
        '90'
    )

    assert.fieldEquals(
        'Term',
        numOfDays.toHexString(),
        'dfFrac',
        '2500'
    )

    assert.fieldEquals(
        'Term',
        numOfDays.toHexString(),
        'paymentNum',
        '1'
    )
})

test("Should create new term for 365 days, and validate term data", () => {
    const numOfDays = BigInt.fromI32(365)

    let termAddedEvent = createTermAddedEvent(numOfDays);
    handleNewTerm(termAddedEvent)

    assert.fieldEquals(
        'Term',
        numOfDays.toHexString(),
        'daysNum',
        '365'
    )

    assert.fieldEquals(
        'Term',
        numOfDays.toHexString(),
        'dfFrac',
        '10000'
    )

    assert.fieldEquals(
        'Term',
        numOfDays.toHexString(),
        'paymentNum',
        '1'
    )
})

test("Should test an integration of products and currencies into the term", () => {
    const currencyShortName = 'ETH';
    const currencyIdentifier = toBytes32(currencyShortName);
    const currencyFullName = 'Ethereum';
    const chainId = 60;

    const numOfDays = BigInt.fromI32(365);

    const productPrefix = Bytes.fromHexString('0x21aaa47b');
    const productAddress = Address.fromString('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
    const controllerAddress = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');

    createCurrencyEntity(
        currencyIdentifier,
        currencyFullName,
        currencyShortName,
        chainId
    );

    createProductEntity(
        productPrefix,
        productAddress,
        controllerAddress
    );

    let termAddedEvent = createProductTermSupportUpdatedEvent(
        numOfDays,
        productPrefix,
        currencyIdentifier,
        true
    );
    handleTermProductSupport(termAddedEvent)

    assert.fieldEquals(
        'Currency',
        currencyIdentifier.toHex(),
        'terms',
        `[${numOfDays.toHex()}]`
    )

    assert.fieldEquals(
        'Product',
        productPrefix.toHex(),
        'terms',
        `[${numOfDays.toHex()}]`
    )
})