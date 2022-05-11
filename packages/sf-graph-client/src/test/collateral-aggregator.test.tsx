import { MockedProvider } from '@apollo/client/testing';
import { expect } from 'chai';
import React from 'react';
import renderer from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { collateralAggregatorQueriesMock } from '../mocks';
import {
    BilateralNettingMock,
    UnsettledPositionMock,
} from '../mocks/components';
import { BILATERAL_POSITIONS, UNSETTLED_POSITIONS } from '../queries';

it('Should render unsettled collateral position component with network error query', async () => {
    let variables = {
        id: '0x000111',
        address: '0x012',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralAggregatorQueriesMock}>
            <UnsettledPositionMock
                query={UNSETTLED_POSITIONS}
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

    await waitForExpect(() => {
        expect(testInstance.children).contain('GraphQL Network Error');
    });
});

it('Should render mock unsettled collateral position component and succesfully get data from query', async () => {
    let variables = {
        id: '0x000111',
        address: '0x01',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralAggregatorQueriesMock}>
            <UnsettledPositionMock
                query={UNSETTLED_POSITIONS}
                variables={variables}
            />
        </MockedProvider>
    );

    await new Promise<void>(res =>
        setTimeout(() => {
            res();
        }, 100)
    );

    const testInstance = testComponent.root.findByType('p');
    await waitForExpect(() => {
        expect(testInstance.children).contain(
            'Unsettled present value for 0x01 is 5500'
        );
    });
});

it('Should render mock unsettled collateral position component and succesfully get data from query', async () => {
    let variables = {
        id: '0x000111',
        address: '0x01',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralAggregatorQueriesMock}>
            <BilateralNettingMock
                query={BILATERAL_POSITIONS}
                variables={variables}
            />
        </MockedProvider>
    );

    await new Promise<void>(res =>
        setTimeout(() => {
            res();
        }, 100)
    );

    const testInstances = testComponent.root.findAllByType('p');

    await waitForExpect(() => {
        expect(testInstances[0].children.toString()).equal(
            'Unsettled PV for 0x010012 is 1500'
        );
        expect(testInstances[1].children.toString()).equal(
            'Settled PV for 0x010012 is 5500'
        );
        expect(testInstances[2].children.toString()).equal(
            'Unsettled PV for 0x01 is 1250'
        );
        expect(testInstances[3].children.toString()).equal(
            'Settled PV for 0x01 is 1000'
        );
        expect(testInstances[4].children.toString()).equal(
            'Net PV for 0x010012 and 0x01 is 4500'
        );
    });
});
