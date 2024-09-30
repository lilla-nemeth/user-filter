import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'@/(.*)$': '<rootDir>/src/$1',
	},
	testMatch: ['<rootDir>/src/app/__tests__/**/*.(spec|test).[jt]s?(x)'],
};

export default createJestConfig(config);
