import { MockedProvider } from '@apollo/client/testing';
import { expect } from 'chai';
import React from 'react';
import renderer from 'react-test-renderer';
import { currencyQueriesMock } from '../mocks';
import { CurrencyMock } from '../mocks/components';
import { CURRENCY } from '../queries';

it('Should successfully render currency component ', () => {
    let variables = {
        currency: '0xETH',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={currencyQueriesMock}>
            <CurrencyMock query={CURRENCY} variables={variables} />
        </MockedProvider>
    );

    const testInstance = testComponent.root.findByType('p');
    expect(testInstance.children).contain('Loading query');
});

it('Should render currency component with network error query', async () => {
    let variables = {
        currency: '0xWETH',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={currencyQueriesMock}>
            <CurrencyMock query={CURRENCY} variables={variables} />
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

it('Should render currency mock component and succesfully get data from query', async () => {
    let variables = {
        currency: '0xETH',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={currencyQueriesMock}>
            <CurrencyMock query={CURRENCY} variables={variables} />
        </MockedProvider>
    );

    await new Promise<void>(res =>
        setTimeout(() => {
            res();
        }, 100)
    );

    const testInstance = testComponent.root.findByType('p');

    expect(testInstance.children).contain('Ethereum: ETH');
});
