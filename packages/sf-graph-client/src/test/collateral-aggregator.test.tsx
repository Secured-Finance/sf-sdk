import React from "react";
import { MockedProvider } from '@apollo/client/testing';
import renderer from "react-test-renderer";
import { UnsettledPositionMock, BilateralNettingMock } from "../mocks/components";
import { collateralAggregatorQueriesMock } from "../mocks";
import { BILATERAL_POSITIONS_FROM_COLLATERAL_AGGREGATOR, UNSETTLED_POSITIONS_FROM_COLLATERAL_AGGREGATOR } from "../queries";
import { expect } from "chai";

it("Should render unsettled collateral position component with network error query", async () => {
    let variables = {
        id: '0x000111',
        address: '0x012',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralAggregatorQueriesMock}>
            <UnsettledPositionMock query={UNSETTLED_POSITIONS_FROM_COLLATERAL_AGGREGATOR} variables={variables}/>
        </MockedProvider>
    );

    await new Promise((r) => setTimeout(r, 10));

    const testInstance = testComponent.toJSON() as renderer.ReactTestRendererJSON
    expect(testInstance.children).contain('GraphQL Network Error');
});

it("Should render mock unsettled collateral position component and succesfully get data from query", async () => {
    let variables = {
        id: '0x000111',
        address: '0x01',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralAggregatorQueriesMock}>
            <UnsettledPositionMock query={UNSETTLED_POSITIONS_FROM_COLLATERAL_AGGREGATOR} variables={variables}/>
        </MockedProvider>
    );

    await new Promise((r) => setTimeout(r, 10));

    const testInstance = testComponent.root.findByType("p");
    expect(testInstance.children).contain('Unsettled present value for 0x01 is 5500');
});


it("Should render mock unsettled collateral position component and succesfully get data from query", async () => {
    let variables = {
        id: '0x000111',
        address: '0x01',
    };

    const testComponent = renderer.create(
        <MockedProvider mocks={collateralAggregatorQueriesMock}>
            <BilateralNettingMock query={BILATERAL_POSITIONS_FROM_COLLATERAL_AGGREGATOR} variables={variables}/>
        </MockedProvider>
    );

    await new Promise((r) => setTimeout(r, 10));

    const testInstances = testComponent.root.findAllByType("p");
    expect(testInstances[0].children.toString()).equal('Unsettled PV for 0x010012 is 1500');
    expect(testInstances[1].children.toString()).equal('Settled PV for 0x010012 is 5500');
    expect(testInstances[2].children.toString()).equal('Unsettled PV for 0x01 is 1250');
    expect(testInstances[3].children.toString()).equal('Settled PV for 0x01 is 1000');
    expect(testInstances[4].children.toString()).equal('Net PV for 0x010012 and 0x01 is 4500');
});
