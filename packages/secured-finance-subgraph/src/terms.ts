import { BigInt, log } from "@graphprotocol/graph-ts"
import { Term } from "../generated/schema"
import { TermAdded, ProductTermSupportUpdated } from '../generated/TermStructure/TermStructure'
import { getCurrency } from "./currency-controller"
import { getProduct } from "./product-resolver"

function createTerm(numDays: BigInt): Term {
    let id = numDays.toHexString()
    const term = new Term(id)

    if (term) {
        term.daysNum = numDays

        term.save()
    }
  
    return term as Term
}

export function getTerm(numDays: BigInt): Term | null {
    const id = numDays.toHexString()
    let term = Term.load(id)

    if (!term) {
        term = createTerm(numDays)
    }

    return term as Term
}

export function handleNewTerm(event: TermAdded): void {
    const term = getTerm(event.params.numDays)

    if (term) {
        // TODO: add payment schedules per frequency, number of payments per frequency

        term.save()
    }
}

export function handleTermProductSupport(event: ProductTermSupportUpdated): void {
    let termID = event.params.numDays
    let termIDHex = termID.toHexString()

    log.info('handleTermProductSupport {} ', [
        termIDHex,
    ]);

    const term = getTerm(termID)

    if (term) {

        log.info('handleTermProductSupport-2 {} {} {} ', [
            term.id,
            event.params.product.toHexString(),
            event.params._ccy.toHexString()
        ]);

        const product = getProduct(event.params.product)
        const ccy = getCurrency(event.params._ccy)

        if (product && ccy) {
            if (event.params.isSupported) {
                let productTerms = product.terms
                productTerms.push(termIDHex)
                product.terms = productTerms
                product.save()

                let ccyTerms = ccy.terms
                ccyTerms.push(termIDHex)
                ccy.terms = ccyTerms
                ccy.save()
            }
        }
    }
}
