/*
* For a detailed explanation regarding each configuration property and type check, visit:
* https://jestjs.io/docs/configuration
*/

export default {
	// A preset that is used as a base for Jest's configuration
	preset: 'ts-jest',

	// The test environment that will be used for testing
	testEnvironment: "node",

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: ["./src/controllers/**", "./src/services/**"],

	// A list of reporter names that Jest uses when writing coverage reports. Any istanbul reporter can be used
	// coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],

	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: [
		"./node_modules/",
		"./dist"
	],

	forceExit: true,

	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,
};
