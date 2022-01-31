import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts"
import { LendingMarketCreated } from "../generated/LendingMarketController/LendingMarketController"
import { LendingMarket, LendingMarketController } from "../generated/schema"
import { LendingMarket as LendingMarketTemplate } from '../generated/templates'
import { BIG_INT_ZERO, LENDING_MARKET_CONTROLLER_ADDR } from "./constants"

export function createLendingController(address: Address): LendingMarketController {
    const lendingController = new LendingMarketController(address.toHex())

    lendingController.totalAvailableLiquidityETH = BIG_INT_ZERO
    lendingController.totalLiquidityETH = BIG_INT_ZERO

    lendingController.totalAvailableLiquidityFIL = BIG_INT_ZERO
    lendingController.totalLiquidityFIL = BIG_INT_ZERO

    lendingController.totalAvailableLiquidityBTC = BIG_INT_ZERO
    lendingController.totalLiquidityBTC = BIG_INT_ZERO

    lendingController.totalAvailableLiquidityUSDC = BIG_INT_ZERO
    lendingController.totalLiquidityUSDC = BIG_INT_ZERO

    lendingController.totalAvailableLiquidityInUSD = BIG_INT_ZERO
    lendingController.totalLiquidityInUSD = BIG_INT_ZERO    

    lendingController.marketCount = 0

    return lendingController as LendingMarketController
}

export function getLendingMarketController(address: Address): LendingMarketController {
    let lendingController = LendingMarketController.load(address.toHex())

    if (lendingController === null) {
        lendingController = createLendingController(address)
    }

    return lendingController as LendingMarketController
}

export function increaseLendingControllerLiquidity(ccy: Bytes, amount: BigInt): void {
    let lendingController = getLendingMarketController(LENDING_MARKET_CONTROLLER_ADDR);

    // switch (ccy) {
    //     case 0:
    //         lendingController.totalAvailableLiquidityETH = lendingController.totalAvailableLiquidityETH.plus(amount)
    //         lendingController.totalLiquidityETH = lendingController.totalLiquidityETH.plus(amount)    
    //     case 1:
    //         lendingController.totalAvailableLiquidityFIL = lendingController.totalAvailableLiquidityFIL.plus(amount)
    //         lendingController.totalLiquidityFIL = lendingController.totalLiquidityFIL.plus(amount)    
    //     case 2:
    //         lendingController.totalAvailableLiquidityUSDC = lendingController.totalAvailableLiquidityUSDC.plus(amount)
    //         lendingController.totalLiquidityUSDC = lendingController.totalLiquidityUSDC.plus(amount)    
    //     case 3:
    //         lendingController.totalAvailableLiquidityBTC = lendingController.totalAvailableLiquidityBTC.plus(amount)
    //         lendingController.totalLiquidityBTC = lendingController.totalLiquidityBTC.plus(amount)    
    //     default:
            
    //     lendingController.save()
    // }
}

export function reduceAvailableLiquidity(ccy: Bytes, amount: BigInt): void {
    let lendingController = getLendingMarketController(LENDING_MARKET_CONTROLLER_ADDR);

    // switch (ccy) {
    //     case 0:
    //         lendingController.totalAvailableLiquidityETH = lendingController.totalAvailableLiquidityETH.minus(amount)
    //     case 1:
    //         lendingController.totalAvailableLiquidityFIL = lendingController.totalAvailableLiquidityFIL.minus(amount)
    //     case 2:
    //         lendingController.totalAvailableLiquidityUSDC = lendingController.totalAvailableLiquidityUSDC.minus(amount) 
    //     case 3:
    //         lendingController.totalAvailableLiquidityBTC = lendingController.totalAvailableLiquidityBTC.minus(amount)
    //     default:
            
    //     lendingController.save()
    // }
}

export function handleNewLendingMarket(event: LendingMarketCreated): void {
    let lendingController = getLendingMarketController(LENDING_MARKET_CONTROLLER_ADDR);
    lendingController.marketCount = lendingController.marketCount + 1
    lendingController.save()

    let market = new LendingMarket(event.params.marketAddr.toHexString()) as LendingMarket
    market.marketAddr = event.params.marketAddr
    market.currency = event.params.ccy
    market.term = event.params.term
    market.controller = LENDING_MARKET_CONTROLLER_ADDR.toHexString()
    market.spread = BIG_INT_ZERO
    market.marketRate = BIG_INT_ZERO
    market.orderCount = 0

    market.totalAvailableLiquidity = BIG_INT_ZERO
    market.totalLiquidity = BIG_INT_ZERO

    market.totalAvailableLiquidityInUSD = BIG_INT_ZERO
    market.totalLiquidityInUSD = BIG_INT_ZERO

    market.createdAtTimestamp = event.block.timestamp
    market.createdAtBlockNumber = event.block.number

    LendingMarketTemplate.create(event.params.marketAddr)
    market.save()
    lendingController.save()
}