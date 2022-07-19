import { Address, BigInt } from "@graphprotocol/graph-ts"
import { assert, test } from "matchstick-as/assembly/index"

import { handleNewLendingMarket } from "../src/lendingController"
import { createLendingMarketCreatedEvent } from "./mocks/lending-controller"
import { toBytes32 } from "./utils/string"
export { handleNewLendingMarket }

const currencyShortName = 'ETH';
const lendingMarketAddress = Address.zero();
const currencyIdentifier = toBytes32(currencyShortName);
const termDays = BigInt.fromI32(365)


test("Should create new lending market and validate market data", () => {
    let event = createLendingMarketCreatedEvent(
        currencyIdentifier,
        termDays,
        lendingMarketAddress
    );
    handleNewLendingMarket(event)

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'marketAddr',
        lendingMarketAddress.toHexString()
    )

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'controllerAddr',
        event.address.toHexString()
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
