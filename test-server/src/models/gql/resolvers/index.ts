import moment from 'moment';

// Own
// Models
import { Test } from '@app/models/mongoose/test';
// Request
import { requestTest2ByIdToAPI } from '@app/common/util/requests';
// Resolvers
import {
  createTest,
  updateTest
} from '@app/models/gql/resolvers/mutation-resolvers';
import {
  AllTests,
  getTestByArrayId,
  getTestById,
  getTestByTestName
} from '@app/models/gql/resolvers/queries-resolvers';

// Define here the resolvers for each query/mutation field.
// Note that some resolvers are imported from other modules since they are too long.
// You can divide each resolver to any file that you want, the point is to leave the files small enough to be readable.
export default {
  Query: {
    AllTests,
    getTestByArrayId,
    getTestById,
    getTestByTestName
  },
  Mutation: {
    createTest,
    updateTest
  },
  Test: {
    testField: async (root, args, ctx) => {
      return await requestTest2ByIdToAPI(root.createBy, ctx.session);
    },
    createdAt: root => {
      return moment((root as Test).createdAt).format();
    },
    updatedAt: root => {
      return moment((root as Test).updatedAt).format();
    }
  }
};
