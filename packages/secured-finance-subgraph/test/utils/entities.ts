import { Currency, Product, Term } from "../../generated/schema";
import { BigInt, Bytes } from "@graphprotocol/graph-ts"

export function createTermEntity(
    daysNum: BigInt,
    dfFrac: BigInt,
    paymentNum: BigInt,
): void {
    const id = daysNum.toHexString()
    const term = new Term(id)
    term.daysNum = daysNum
    term.dfFrac = dfFrac
    term.paymentNum = paymentNum
    term.save()
};

export function createProductEntity(
    prefix: Bytes,
    productImplementation: Bytes,
    productController: Bytes,
): void {
    const id = prefix.toHexString()
    const product = new Product(id)
    product.productImplementation = productImplementation
    product.productController = productController
    product.prefix = prefix
    product.terms = []
    product.save()
};

export function createCurrencyEntity(
    identifier: Bytes,
    name: string,
    shortName: string,
    chainId: i32,
  ): void {
    const id = identifier.toHexString()
    const ccy = new Currency(id)
    ccy.name = name
    ccy.shortName = shortName
    ccy.chainId = chainId
    ccy.terms = []
    ccy.save()
};