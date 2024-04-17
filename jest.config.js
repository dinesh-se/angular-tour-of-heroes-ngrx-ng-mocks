/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  preset: 'jest-preset-angular',
  testEnvironment: 'jest-environment-jsdom-global',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@services/(.*)$': '<rootDir>/src/app/services/$1',
    '^@model/(.*)$': '<rootDir>/src/app/model/$1',
    '^@mocks/(.*)$': '<rootDir>/src/app/mocks/$1',
    '^@store/(.*)$': '<rootDir>/src/app/store/$1',
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/html-comment',
  ]
};

module.exports = config;
