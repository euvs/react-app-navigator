module.exports = {
    preset: 'ts-jest',
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    collectCoverageFrom: ['lib/**/*.{js,jsx,ts,tsx}'],
    setupFilesAfterEnv: ['react-testing-library/cleanup-after-each'],
};
