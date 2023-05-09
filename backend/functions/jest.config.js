const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
	clearMocks: true,

	collectCoverage: true,
	collectCoverageFrom: ["src/**", "!src/__tests__/**/*"],
	coverageDirectory: "src/__tests__/coverage",
	coverageProvider: 'v8',

	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
	preset: 'ts-jest',

	testEnvironment: 'node',
	testMatch: [
	  "**/__tests__/**/*.test.ts",
	],
};
