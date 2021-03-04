import { Address, BigInt } from "@graphprotocol/graph-ts"
import { User } from "../generated/schema"
import { BIG_INT_ZERO } from "./constants"

export function createUser(address: Address, time: BigInt): User {
    const user = new User(address.toHex())

    user.owner = address
    user.updatedAt = time
    user.totalBorrowInETH = BIG_INT_ZERO
    user.totalCollateralInETH = BIG_INT_ZERO
    user.totalLendInETH = BIG_INT_ZERO
  
    return user as User
}
  
export function getUser(address: Address, time: BigInt): User {
    let user = User.load(address.toHex())

    if (user === null) {
        user = createUser(address, time)
    }

    return user as User
}
  