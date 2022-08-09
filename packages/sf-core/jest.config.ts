module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.test\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['src/**/*.ts', '!**/*.module.ts', '!**/index.ts'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
};
