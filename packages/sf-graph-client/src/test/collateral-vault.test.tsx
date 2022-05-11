import { MockedProvider } from '@apollo/client/testing';
import { expect } from 'chai';
import React from 'react';
import renderer from 'react-test-renderer';
import { collateralVaultQueriesMock } from '../mocks';
import { BilateralPositionMock, CollateralBookMock } from '../mocks/components';
import {
    BILATERAL_POSITIONS_FROM_VAULT,
    COLLATERAL_BOOK_FROM_VAULT,
} from '../queries';

it('Should successfully render collateral book component ', () => {
    let variables = {
        vaultId: '0xETH',
        address: '0x01',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralVaultQueriesMock}>
            <CollateralBookMock
                query={COLLATERAL_BOOK_FROM_VAULT}
                variables={variables}
            />
        </MockedProvider>
    );

    const testInstance = testComponent.root.findByType('p');
    expect(testInstance.children).contain('Loading query');
});

it('Should render collateral book component with network error query', async () => {
    let variables = {
        vaultId: '0xWETH',
        address: '0x01',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralVaultQueriesMock}>
            <CollateralBookMock
                query={COLLATERAL_BOOK_FROM_VAULT}
                variables={variables}
            />
        </MockedProvider>
    );

    await new Promise(r => setTimeout(r, 30));

    const testInstance =
        testComponent.toJSON() as renderer.ReactTestRendererJSON;
    expect(testInstance.children).contain('GraphQL Network Error');
});

it('Should render mock collateral book component and succesfully get data from query', async () => {
    let variables = {
        vaultId: '0xETH',
        address: '0x01',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralVaultQueriesMock}>
            <CollateralBookMock
                query={COLLATERAL_BOOK_FROM_VAULT}
                variables={variables}
            />
        </MockedProvider>
    );

    await new Promise(r => setTimeout(r, 30));

    const testInstances =
        testComponent.toJSON() as renderer.ReactTestRendererJSON;

    let instant0 = testInstances.children[0] as renderer.ReactTestRendererJSON;
    let instant1 = testInstances.children[1] as renderer.ReactTestRendererJSON;
    expect(instant0.children.toString()).equal(
        'Independent collateral for 0x01 is 1000'
    );
    expect(instant1.children.toString()).equal(
        'Locked collateral for 0x01 is 5000'
    );
});

it('Should render mock bilateral position component and succesfully get data from query', async () => {
    let variables = {
        vaultId: '0xETH',
        address: '0x01',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralVaultQueriesMock}>
            <BilateralPositionMock
                query={BILATERAL_POSITIONS_FROM_VAULT}
                variables={variables}
            />
        </MockedProvider>
    );

    await new Promise(r => setTimeout(r, 30));

    const testInstances =
        testComponent.toJSON() as renderer.ReactTestRendererJSON;

    let instant0 = testInstances.children[0] as renderer.ReactTestRendererJSON;
    let instant1 = testInstances.children[1] as renderer.ReactTestRendererJSON;
    expect(instant0.children.toString()).equal(
        'Locked collateral for 0x010012 is 10000'
    );
    expect(instant1.children.toString()).equal(
        'Locked collateral for 0x01 is 50000'
    );
});
