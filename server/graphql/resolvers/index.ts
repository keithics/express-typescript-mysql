import {PersonResolver} from './person.resolver';

const { mergeResolvers } = require('@graphql-tools/merge');

/**
 * Merge all Type definitions here.. we will manually add it in the array
 * it is better than automatically, adding file using globs
 */

export const Resolvers = mergeResolvers([
    PersonResolver
]);

