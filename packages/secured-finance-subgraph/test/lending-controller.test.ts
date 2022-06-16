import { assert, logStore, test } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"

import { createLendingMarketCreatedEvent } from "./mocks/lending-controller"
import { handleNewLendingMarket } from "../src/lendingController"
import { toBytes32 } from "./utils/string"
import { LENDING_MARKET_CONTROLLER_ADDR } from "../src/constants"
import { createCurrencyEntity } from "./utils/entities"
export { handleNewLendingMarket }

const currencyShortName = 'ETH';
const lendingMarketAddress = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');
const currencyIdentifier = toBytes32(currencyShortName);
const termDays = BigInt.fromI32(365)

test("Should create new lending market and validate market data", () => {
    createCurrencyEntity(
        currencyIdentifier,
        'Ethereum',
        currencyShortName,
        60
    )

    let event = createLendingMarketCreatedEvent(
        currencyIdentifier,
        termDays,
        lendingMarketAddress
    );
    handleNewLendingMarket(event)

    assert.fieldEquals(
        'LendingMarketController',
        LENDING_MARKET_CONTROLLER_ADDR.toHexString(),
        'marketCount',
        '1'
    )

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'marketAddr',
        lendingMarketAddress.toHexString()
    )

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'controller',
        LENDING_MARKET_CONTROLLER_ADDR.toHexString()
    )

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'currency',
        currencyIdentifier.toHexString()
    )

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'term',
        termDays.toString()
    )
})
