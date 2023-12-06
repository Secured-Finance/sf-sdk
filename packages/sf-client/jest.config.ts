module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    transformIgnorePatterns: ['../sf-core/', 'node_modules'],
    collectCoverageFrom: ['src/**/*.ts', '!**/*.module.ts', '!**/index.ts'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
};
