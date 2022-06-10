import { Bytes } from "@graphprotocol/graph-ts"
import { Currency, PriceFeed } from "../generated/schema"
import { 
    CcyAdded, 
    LTVUpdated, 
    MinMarginUpdated, 
    CcySupportUpdate, 
    CcyCollateralUpdate, 
    PriceFeedAdded, 
    PriceFeedRemoved 
} from '../generated/CurrencyController/CurrencyController'
import { ADDRESS_ZERO, EMPTY_STRING } from './constants'
import { getCurrencyName } from "./helpers"

function createCurrency(identifier: Bytes): Currency {
    const id = identifier.toHexString()
    const currency = new Currency(id)

    if (currency) {
        currency.identifier = identifier

        currency.save()
    }

    return currency as Currency
}

export function getCurrency(identifier: Bytes): Currency {
    const id = identifier.toHexString()
    let currency = Currency.load(id)

    if (!currency) {
        currency = createCurrency(identifier)
    }

    return currency as Currency
}

export function handleNewCurrency(event: CcyAdded): void {
    const currency = getCurrency(event.params.ccy)
    let ccyShortName = getCurrencyName(event.params.ccy.toHexString());

    currency.name = event.params.name
    currency.shortName = ccyShortName
    currency.chainID = event.params.chainId
    currency.ltv = event.params.ltv
    currency.isSupported = true

    currency.save()
}

export function handleCurrencyLTVUpdate(event: LTVUpdated): void {
    const ccy = getCurrency(event.params.ccy)

    if (ccy) {
        ccy.ltv = event.params.ltv
        ccy.save()
    }
}

export function handleCurrencyMinMarginUpdate(event: MinMarginUpdated): void {
    const ccy = getCurrency(event.params.ccy)

    if (ccy) {
        ccy.minMargin = event.params.minMargin
        ccy.save()
    }
}

export function handleCurrencySupportUpdate(event: CcySupportUpdate): void {
    const ccy = getCurrency(event.params.ccy)

    if (ccy) {
        ccy.isSupported = event.params.isSupported
        ccy.save()
    }
}

export function handleCurrencyCollateralSupportUpdate(event: CcyCollateralUpdate): void {
    const ccy = getCurrency(event.params.ccy)

    if (ccy) {
        ccy.isCollateral = event.params.isCollateral
        ccy.save()
    }
}

export function handleCurrencyPriceFeed(event: PriceFeedAdded): void {
    const ccy = getCurrency(event.params.ccy)

    if (ccy) {
        const id = event.params.ccy.toHexString()
        const priceFeed = new PriceFeed(id)
    
        if (priceFeed) {
            let ccyShortName = getCurrencyName(ccy.identifier.toHexString());
            let pair = ccyShortName + '-' + event.params.secondCcy

            priceFeed.contract = event.params.priceFeed
            priceFeed.currency = event.params.ccy.toHexString()
            priceFeed.pair = pair

            priceFeed.save()
        }    
    }
}

export function handleCurrencyPriceFeedRemove(event: PriceFeedRemoved): void {
    const ccy = getCurrency(event.params.ccy)

    if (ccy) {
        const id = event.params.ccy.toHexString()
        const priceFeed = new PriceFeed(id)
    
        if (priceFeed) {
            priceFeed.contract = ADDRESS_ZERO
            priceFeed.currency = event.params.ccy.toHexString()
            priceFeed.pair = EMPTY_STRING.toHexString()

            priceFeed.save()
        }    
    }
}