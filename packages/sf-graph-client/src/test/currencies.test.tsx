import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import renderer from 'react-test-renderer';
import { CurrencyMock } from '../mocks/components';
import { expect } from 'chai';
import { CURRENCIES, CURRENCY } from '../queries';
import { currencyQueriesMock } from '../mocks';

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

    await new Promise(r => setTimeout(r, 10));

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

    await new Promise(r => setTimeout(r, 10));

    const testInstance = testComponent.root.findByType('p');
    expect(testInstance.children).contain('Ethereum: ETH');
});
