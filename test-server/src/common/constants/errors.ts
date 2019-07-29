import { ApolloError } from 'apollo-server-errors';

/**
 * Disclaimer: this is a initiative to provide app known errors to the client.
 * Isn't applied in all the code of this microservice.
 * If this initiative works and is accepted by the team it should be implemented in the rest of the code, most in resolvers functions.
 * [[include:errors.md]]
 */

/**
 * Provides a dictionary with the app known errors.
 */
const errors = {
  generateUnknownError: (error: any) => buildApolloError('1', error.toString()),
  TEST_NOT_EXISTS: buildApolloError('2', `Test record doesn't exists.`),
  UNAUTHORIZED_TO_GET_TEST: buildApolloError(
    '3',
    `The user cannot see test records since it isn't repository owner.`
  )
};

function buildApolloError(code: string, message: string): ApolloError {
  return new ApolloError(message, code);
}

export default errors;
