import { PersonTypes } from './person.types';

const { mergeTypeDefs } = require('@graphql-tools/merge');

/**
 * Merge all Type definitions here.. we will manually add it in the array
 * it is better than automatically, adding file using globs
 */
export const TypeDefs = mergeTypeDefs([
    PersonTypes
]);


