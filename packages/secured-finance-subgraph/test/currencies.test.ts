import { assert, test } from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"

import { createCcyAddedEvent, createLTVUpdatedEvent, createMinMarginUpdatedEvent, createCcySupportUpdateEvent, createCcyCollateralUpdateEvent, createPriceFeedAddedEvent, createPriceFeedRemovedEvent } from "./mocks/currencies"
import { handleCurrencyLTVUpdate, handleNewCurrency, handleCurrencyMinMarginUpdate, handleCurrencySupportUpdate, handleCurrencyCollateralSupportUpdate, handleCurrencyPriceFeed, handleCurrencyPriceFeedRemove } from "../src/currency-controller"
import { toBytes32 } from "./utils/string"
import { ADDRESS_ZERO, EMPTY_STRING, ETH_CCY_IDENTIFIER } from "../src/constants"
import { Currency } from "../generated/schema"
export { handleCurrencyLTVUpdate, handleNewCurrency, handleCurrencyMinMarginUpdate, handleCurrencySupportUpdate, handleCurrencyCollateralSupportUpdate, handleCurrencyPriceFeed, handleCurrencyPriceFeedRemove }

const currencyShortName = 'ETH';
const currencyIdentifier = toBytes32(currencyShortName);
const currencyFullName = 'Ethereum';
const chainId = 60;
const ltv = BigInt.fromI32(7500);
const secondCcy = 'FIL'
const priceFeed = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');

test("Should create new currency, and validate currency information", () => {
    assert.stringEquals(
        currencyIdentifier.toHexString(),
        ETH_CCY_IDENTIFIER
    );

    let event = createCcyAddedEvent(
        currencyIdentifier,
        currencyFullName,
        chainId,
        ltv
    );
    handleNewCurrency(event)

    assert.fieldEquals(
        'Currency',
        currencyIdentifier.toHexString(),
        'shortName',
        currencyShortName
    )

    assert.fieldEquals(
        'Currency',
        currencyIdentifier.toHexString(),
        'name',
        currencyFullName
    )
})

test("Should update existing currency LTV, and validate currency information", () => {
    const newLTV = BigInt.fromI32(8000);
    let event = createLTVUpdatedEvent(
        currencyIdentifier,
        newLTV
    );
    handleCurrencyLTVUpdate(event)

    assert.fieldEquals(
        'Currency',
        currencyIdentifier.toHexString(),
        'ltv',
        newLTV.toString()
    )
})

test("Should update existing currency minimal margin, and validate currency information", () => {
    const newMinMargin = BigInt.fromI32(2500);
    let event = createMinMarginUpdatedEvent(
        currencyIdentifier,
        newMinMargin
    );
    handleCurrencyMinMarginUpdate(event)

    assert.fieldEquals(
        'Currency',
        currencyIdentifier.toHexString(),
        'minMargin',
        newMinMargin.toString()
    )
})

test("Should update existing currency minimal margin, and validate currency information", () => {
    let event = createCcySupportUpdateEvent(
        currencyIdentifier,
        false
    );
    handleCurrencySupportUpdate(event)

    assert.fieldEquals(
        'Currency',
        currencyIdentifier.toHexString(),
        'isSupported',
        'false'
    )
})

test("Should update existing currency collateral support, and validate currency information", () => {
    let event = createCcyCollateralUpdateEvent(
        currencyIdentifier,
        false
    );
    handleCurrencyCollateralSupportUpdate(event)

    assert.fieldEquals(
        'Currency',
        currencyIdentifier.toHexString(),
        'isCollateral',
        'false'
    )
})

test("Should add price feed for existing currency, and validate price feed data", () => {
    const currency = Currency.load(currencyIdentifier.toHex());

    if (currency) {
        const priceFeedId = currency.shortName + '-' + secondCcy

        let event = createPriceFeedAddedEvent(
            currencyIdentifier,
            secondCcy,
            priceFeed
        );
        handleCurrencyPriceFeed(event)
    
        assert.fieldEquals(
            'PriceFeed',
            currencyIdentifier.toHex(),
            'contract',
            priceFeed.toHex()
        )
    
        assert.fieldEquals(
            'PriceFeed',
            currencyIdentifier.toHex(),
            'pair',
            priceFeedId
        )    
    }
})

test("Should remove existing price feed for existing currency, and validate price feed data", () => {
    const currency = Currency.load(currencyIdentifier.toHex());

    if (currency) {
        const priceFeedId = currency.shortName + '-' + secondCcy

        let event = createPriceFeedRemovedEvent(
            currencyIdentifier,
            secondCcy,
            priceFeed
        );
        handleCurrencyPriceFeedRemove(event)
    
        assert.fieldEquals(
            'PriceFeed',
            currencyIdentifier.toHex(),
            'contract',
            ADDRESS_ZERO.toHex()
        )
    
        assert.fieldEquals(
            'PriceFeed',
            currencyIdentifier.toHex(),
            'pair',
            EMPTY_STRING.toHex()
        )    
    }
})
