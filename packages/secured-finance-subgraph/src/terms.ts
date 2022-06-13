import { BigInt, log } from "@graphprotocol/graph-ts"
import { Term } from "../generated/schema"
import { TermAdded, ProductTermSupportUpdated } from '../generated/TermStructure/TermStructure'
import { BIG_INT_ZERO } from "./constants"
import { getCurrency } from "./currency-controller"
import { getDiscountFactorFractions, getLoanPaymentFrequencyFromTerm } from "./helpers"
import { getProduct } from "./product-resolver"

function createTerm(numDays: BigInt): Term {
    let id = numDays.toHexString()
    const term = new Term(id)

    if (term) {
        term.daysNum = numDays
        term.dfFrac = BIG_INT_ZERO
        term.paymentNum = BIG_INT_ZERO
        term.daysNum = numDays
        term.products = []
        term.currencies = []

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
    const daysNum = event.params.numDays
    const term = getTerm(daysNum)

    if (term) {
        term.dfFrac = getDiscountFactorFractions(daysNum)
        term.paymentNum = getLoanPaymentFrequencyFromTerm(daysNum)
        // TODO: add payment schedules per frequency, number of payments per frequency

        term.save()
    }
}

export function handleTermProductSupport(event: ProductTermSupportUpdated): void {
    let termID = event.params.numDays
    let termIDHex = termID.toHexString()

    const term = getTerm(termID)

    if (term) {
        const product = getProduct(event.params.product)
        const ccy = getCurrency(event.params._ccy)

        if (product && ccy) {
            if (event.params.isSupported) {
                let productTerms = product.terms
                let ccyTerms = ccy.terms
        
                if (productTerms) {
                    productTerms.push(termIDHex)
                    product.terms = productTerms
                    product.save()
                }

                if (ccyTerms) {
                    ccyTerms.push(termIDHex)
                    ccy.terms = ccyTerms
                    ccy.save()    
                }
            }
        }
    }
}
