/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

module.exports = {
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/utils/burger-api.ts$1'
  }
};

const config: Config = {
  collectCoverage: true,  
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью `ts-jest`
    // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        '^.+\\.tsx?$': 'ts-jest'
      }
    ]
  }

  
};

export default config;
