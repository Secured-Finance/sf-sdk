import { Address, BigInt } from '@graphprotocol/graph-ts';
import { User } from '../generated/schema';

export function createUser(address: Address, time: BigInt): User {
    const user = new User(address.toHex());

    user.owner = address;
    user.updatedAt = time;
    user.totalBorrowInETH = BigInt.fromI32(0);
    user.totalLendInETH = BigInt.fromI32(0);

    return user as User;
}

export function getUser(address: Address, time: BigInt): User {
    let user = User.load(address.toHex());

    if (user === null) {
        user = createUser(address, time);
    }

    return user as User;
}
