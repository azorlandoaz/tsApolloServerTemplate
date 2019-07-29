// Own
// Constants
import { API_GATEWAY_URL } from '@app/common/constants/general';
import ERRORS from '@app/common/constants/errors';
// Models
import testModel from '@app/models/mongoose/test';
// Utils
import { RequestAPI, gql } from 'mdk-services-interface';
import getLogger from '@app/common/util/logger';
// Types
import { MDKSession } from 'mdk-services-interface/dist/common/types/mdk-session';

export const AllTests = (root, args, ctx) => {
  return testModel.find();
};

export const getTestByArrayId = (root, args, ctx) => {
  const { arrayIds } = args;
  return testModel.find({ _id: { $in: arrayIds } });
};

export const getTestById = async (_, args: any, ctx: any) => {
  const session: MDKSession = ctx.session;

  if (!session.functionalObjectives.includes('repository-owner')) {
    return Promise.reject(ERRORS.UNAUTHORIZED_TO_GET_TEST);
  }

  const testRecord = await testModel.findById(args.id).catch(err => {
    getLogger().error(
      `There was an error getting file record from BD. Details: ${err}`
    );
    return Promise.reject(
      ERRORS.generateUnknownError('Internal server error getting test record.')
    );
  });

  if (!testRecord) {
    return Promise.reject(ERRORS.TEST_NOT_EXISTS);
  }

  return testRecord;
};

export const getTestByTestName = async (root, args, ctx) => {
  const { testname } = args;

  let error = null;

  // Example of usage of mdk-services-interface to get data from external microservice
  const user = await new RequestAPI()
    .GQLRequest({
      APIGatewayURL: API_GATEWAY_URL,
      operationName: 'getUserById',
      query: gql`
        query getUserByUsername($username: String) {
          getUserById(username: $username) {
            id
          }
        }
      `,
      variables: {
        id: '6f6567h7g767hj78'
      },
      session: ctx.session,
      targetServer: 'USERS_SERVER'
    })
    .toPromise()
    .then((response: any) => response.data.getUserByUsername)
    .catch(_error => {
      error = `There was an error fetching the user. Details: ${_error}`;
      getLogger().error(error);
      return null;
    });

  if (error) {
    return Promise.reject(error);
  }

  return testModel.findOne({ testname: testname, createdBy: user.id });
};
