import { Address, BigInt } from '@graphprotocol/graph-ts';
import { assert, test } from 'matchstick-as/assembly/index';

import { handleNewLendingMarket } from '../src/lending-controller';
import { createLendingMarketCreatedEvent } from './mocks/lending-controller';
import { toBytes32 } from './utils/string';
export { handleNewLendingMarket };

const currencyShortName = 'ETH';
const lendingMarketAddress = Address.zero();
const currencyIdentifier = toBytes32(currencyShortName);
const termDays = BigInt.fromI32(365);
const index = BigInt.fromI32(0);

test('Should create new lending market and validate market data', () => {
    let event = createLendingMarketCreatedEvent(
        currencyIdentifier,
        lendingMarketAddress,
        index,
        termDays
    );
    handleNewLendingMarket(event);

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'marketAddr',
        lendingMarketAddress.toHexString()
    );

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'controllerAddr',
        event.address.toHexString()
    );

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'currency',
        currencyIdentifier.toHexString()
    );

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'maturity',
        termDays.toString()
    );

    assert.fieldEquals(
        'LendingMarket',
        lendingMarketAddress.toHexString(),
        'index',
        index.toString()
    );
});
