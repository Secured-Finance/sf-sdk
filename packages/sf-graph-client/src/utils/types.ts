import { ApolloError } from '@apollo/client';
import { BigNumber } from 'ethers';

export interface OrderbookRow {
    rate: number;
    totalAmount: number;
    usdAmount: number | string;
}

export interface LoanQueryResponse {
    id: string;
    lender: string;
    borrower: string;
    currency: string;
    term: number;
    notional: number;
    couponPayment: number;
    rate: number;
    startTimestamp: number;
    endTimestamp: number;
    presentValue: number;
    state: number;
}

export interface CurrencyQueryResponse {
    id: string;
    identifier: string;
    name: string;
    shortName: string;
    chainID: number;
    ltv: number;
    minMargin: number;
    isSupported: boolean;
    isCollateral: boolean;
}

export interface CurrencyInfo {
    name: string;
    shortName: string;
}

export interface CollateralBookQueryResponse {
    id: string;
    address: string;
    tokenAddress: string;
    currency: CurrencyInfo;
    collateralBooks: Array<CollateralBook>;
}

export interface BilateralPositionsQueryResponse {
    id: string;
    address: string;
    tokenAddress: string;
    currency: CurrencyInfo;
    bilateralPositions: Array<BilateralPosition>;
}

export interface CollateralBook {
    id: string;
    address: string;
    independentCollateral: number;
    lockedCollateral: number;
}

export interface BilateralPosition {
    id: string;
    address0: string;
    address1: string;
    lockedCollateral0: number;
    lockedCollateral1: number;
}

export interface UnsettledExposureQueryResponse {
    collateralPositions: Array<UnsettledCollateral>;
}

export interface UnsettledCollateral {
    id: string;
    address: string;
    collateralPositions: Array<CollateralPositions>;
}

export interface CollateralPositions {
    unsettledPV: number;
    currencyIdentifier: string;
    currency: CurrencyInfo;
}

export interface BilateralNettingQueryResponse {
    bilateralPositions: Array<BilateralNetting>;
}

export interface BilateralNetting {
    id: string;
    address0: string;
    address1: string;
    collateralNettings: Array<CollateralNetting>;
}

export interface CollateralNetting {
    unsettled0PV: number;
    unsettled1PV: number;
    party0PV: number;
    party1PV: number;
    netPV: number;
    currency: CurrencyInfo;
}

export interface CollateralBookResponse {
    ccyIndex: number;
    ccyName: string;
    collateral: BigNumber;
    usdCollateral: BigNumber;
    vault: string;
    locked?: BigNumber;
    usdLocked?: BigNumber;
    borrowed?: BigNumber;
    usdBorrowed?: BigNumber;
}

export type QueryResult<T> = {
    data: T | undefined;
    error: ApolloError;
};
