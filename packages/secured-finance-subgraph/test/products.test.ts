import { assert, test } from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"

import { createRegisterProductEvent } from "./mocks/products"
import { handleNewProduct } from "../src/product-resolver"
export { handleNewProduct }

const productPrefix = Bytes.fromHexString('0x21aaa47b');
const productAddress = Address.fromString('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
const controllerAddress = Address.fromString('0x95401dc811bb5740090279Ba06cfA8fcF6113778');

test("Should create new product, and validate product information", () => {
    let event = createRegisterProductEvent(
        productPrefix,
        productAddress,
        controllerAddress
    );
    handleNewProduct(event)

    assert.fieldEquals(
        'Product',
        productPrefix.toHexString(),
        'prefix',
        productPrefix.toHexString()
    )

    assert.fieldEquals(
        'Product',
        productPrefix.toHexString(),
        'productImplementation',
        productAddress.toHexString()
    )

    assert.fieldEquals(
        'Product',
        productPrefix.toHexString(),
        'productController',
        controllerAddress.toHexString()
    )
})

test("Should update existing product information", () => {
    const productAddress = Address.fromString('0x9A676e781A523b5d0C0e43731313A708CB607508');
    const controllerAddress = Address.fromString('0x998abeb3E57409262aE5b751f60747921B33613E');
    
    let event = createRegisterProductEvent(
        productPrefix,
        productAddress,
        controllerAddress
    );
    handleNewProduct(event)

    assert.fieldEquals(
        'Product',
        productPrefix.toHexString(),
        'prefix',
        productPrefix.toHexString()
    )

    assert.fieldEquals(
        'Product',
        productPrefix.toHexString(),
        'productImplementation',
        productAddress.toHexString()
    )

    assert.fieldEquals(
        'Product',
        productPrefix.toHexString(),
        'productController',
        controllerAddress.toHexString()
    )
})
