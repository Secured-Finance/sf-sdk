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
    const variables = {
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
    const variables = {
        vaultId: '0xWETH',
        address: '0x01',
    };
    // this.timeout = 4000;
    const testComponent = renderer.create(
        <MockedProvider mocks={collateralVaultQueriesMock}>
            <CollateralBookMock
                query={COLLATERAL_BOOK_FROM_VAULT}
                variables={variables}
            />
        </MockedProvider>
    );

    await new Promise<void>(res =>
        setTimeout(() => {
            res();
        }, 100)
    );

    const testInstance =
        testComponent.toJSON() as renderer.ReactTestRendererJSON;
    expect(testInstance.children).contain('GraphQL Network Error');
});

it('Should render mock collateral book component and successfully get data from query', async () => {
    const variables = {
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

    await new Promise<void>(res =>
        setTimeout(() => {
            res();
        }, 100)
    );

    const testInstances =
        testComponent.toJSON() as renderer.ReactTestRendererJSON;

    const instant0 = testInstances
        .children[0] as renderer.ReactTestRendererJSON;
    const instant1 = testInstances
        .children[1] as renderer.ReactTestRendererJSON;

    expect(instant0.children.toString()).equal(
        'Independent collateral for 0x01 is 1000'
    );
    expect(instant1.children.toString()).equal(
        'Locked collateral for 0x01 is 5000'
    );
});

it('Should render mock bilateral position component and successfully get data from query', async () => {
    const variables = {
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

    await new Promise<void>(res =>
        setTimeout(() => {
            res();
        }, 100)
    );

    const testInstances =
        testComponent.toJSON() as renderer.ReactTestRendererJSON;

    const instant0 = testInstances
        .children[0] as renderer.ReactTestRendererJSON;
    const instant1 = testInstances
        .children[1] as renderer.ReactTestRendererJSON;

    expect(instant0.children.toString()).equal(
        'Locked collateral for 0x010012 is 10000'
    );
    expect(instant1.children.toString()).equal(
        'Locked collateral for 0x01 is 50000'
    );
});
