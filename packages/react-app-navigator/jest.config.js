module.exports = {
    preset: 'ts-jest',
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverageFrom: ['lib/**/*.{js,jsx,ts,tsx}'],
    setupTestFrameworkScriptFile: 'react-testing-library/cleanup-after-each',
};
