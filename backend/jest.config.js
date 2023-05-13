const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
	clearMocks: true,

	collectCoverage: false,
	collectCoverageFrom: ["src/**", "!src/__Tests__/**/*", "!src/Interfaces/**/*"],
	coverageDirectory: "src/__Tests__/coverage",
	coverageProvider: 'v8',

	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>'}),
	preset: 'ts-jest',

	testEnvironment: 'node',
	testMatch: [
	  "**/__Tests__/**/*.test.ts",
	],
};
