module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    testRegex: '.*\\.test\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
        '^.+\\.tsx$': 'ts-jest',
    },
    collectCoverageFrom: ['src/**/*.ts', '!**/*.module.ts', '!**/index.ts'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    rootDir: '.',
    moduleNameMapper: {
        'src/(.*)': '<rootDir>/src/$1',
    },
};
