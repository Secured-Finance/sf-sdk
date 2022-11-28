import { Address, BigInt } from '@graphprotocol/graph-ts';
import { assert, test } from 'matchstick-as/assembly/index';
import { handleCreateLendingMarket } from '../src/lending-controller';

import { createCreateLendingMarketEvent } from './mocks/lending-controller';
import { toBytes32 } from './utils/string';

const lendingMarketAddress = Address.zero();
const futureValueVault = Address.zero();
const ccy = toBytes32('ETH');
const maturity = BigInt.fromI32(365);
const index = BigInt.fromI32(0);

test('Should create new lending market and validate market data', () => {
    const event = createCreateLendingMarketEvent(
        ccy,
        lendingMarketAddress,
        futureValueVault,
        index,
        maturity
    );
    handleCreateLendingMarket(event);

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'contractAddress',
        lendingMarketAddress.toHexString()
    );

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'currency',
        ccy.toHexString()
    );

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'maturity',
        maturity.toString()
    );
});
