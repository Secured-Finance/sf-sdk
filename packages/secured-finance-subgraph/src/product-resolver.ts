import { Bytes } from "@graphprotocol/graph-ts"
import { Product } from "../generated/schema"
import { RegisterProduct } from '../generated/ProductAddressResolver/ProductAddressResolver'

function createProduct(prefix: Bytes): Product {
    const id = prefix.toHexString()
    const product = new Product(id)

    if (product) {
        product.prefix = prefix
        product.save()
    }

    return product as Product
}

export function getProduct(prefix: Bytes): Product | null {
    const id = prefix.toHexString()
    let product = Product.load(id)

    if (!product) {
        product = createProduct(prefix)
    }

    return product as Product
}

export function handleNewProduct(event: RegisterProduct): void {
    const product = getProduct(event.params.prefix)

    if (product) {
        product.productImplementation = event.params.product
        product.productController = event.params.controller
    
        product.save()
    }
}
