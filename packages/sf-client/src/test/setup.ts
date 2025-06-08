import { expect } from '@jest/globals';
import timemachine from 'timemachine';

// Add BigInt serializer
expect.addSnapshotSerializer({
    test: (val: unknown): val is bigint => typeof val === 'bigint',
    print: (val: unknown) => String(val),
});

// Add custom matcher for BigInt
expect.extend({
    toBeBigInt(received: bigint, expected: bigint) {
        const pass = received === expected;
        if (pass) {
            return {
                message: () => `expected ${received} not to be ${expected}`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to be ${expected}`,
                pass: false,
            };
        }
    },
});

// Setup environment
process.env.SF_ENV = 'development';
timemachine.reset();
timemachine.config({
    dateString: '2023-11-01T11:00:00.00Z',
});

// @ts-ignore
beforeAll(() => {
    process.env.SF_ENV = 'development';
    timemachine.reset();
    timemachine.config({
        dateString: '2023-11-01T11:00:00.00Z',
    });
});

// @ts-ignore
beforeEach(() => {
    jest.resetAllMocks();
});

// @ts-ignore
afterAll(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
});
