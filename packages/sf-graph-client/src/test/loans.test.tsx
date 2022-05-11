import { MockedProvider } from '@apollo/client/testing';
import { expect } from 'chai';
import React from 'react';
import renderer from 'react-test-renderer';
import waitForExpect from 'wait-for-expect';
import { loanQueriesMock } from '../mocks';
import { LoanMock } from '../mocks/components';
import { LOAN_DEALS } from '../queries';

it('Should successfully render loans component ', () => {
    let variables = {
        account: '0x1',
        skip: 0,
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={loanQueriesMock}>
            <LoanMock query={LOAN_DEALS} variables={variables} />
        </MockedProvider>
    );

    const testInstance = testComponent.root.findByType('p');
    expect(testInstance.children).contain('Loading query');
});

it('Should render loans component with network error query', async () => {
    let variables = {
        account: '0x0',
        skip: 0,
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={loanQueriesMock}>
            <LoanMock query={LOAN_DEALS} variables={variables} />
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

it('Should render mock loans component and succesfully get data from query', async () => {
    let variables = {
        account: '0x1',
        skip: 0,
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={loanQueriesMock}>
            <LoanMock query={LOAN_DEALS} variables={variables} />
        </MockedProvider>
    );

    await new Promise<void>(res =>
        setTimeout(() => {
            res();
        }, 100)
    );

    const testInstance = testComponent.root.findByType('p');

    await waitForExpect(() => {
        expect(testInstance.children).contain('10000: 5000');
    });
});
