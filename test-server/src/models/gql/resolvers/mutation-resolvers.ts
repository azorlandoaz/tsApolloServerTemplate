// Own
// Models
import testModel, { Test } from '@app/models/mongoose/test';
// Utils
import getLogger from '@app/common/util/logger';

const performSave = (testToSave: Test, source: any): Promise<Test> => {
  let shouldUpdate = false;

  for (const argName in source) {
    if (source.hasOwnProperty(argName)) {
      testToSave[argName] = source[argName];
      shouldUpdate = true;
    }
  }

  if (!testToSave.isNew && !shouldUpdate) {
    return Promise.resolve(testToSave);
  }

  testToSave.addHash();
  return testToSave.save();
};

export const createTest = async (root, args, ctx) => {
  return performSave(new testModel(), args);
};

export const updateTest = async (root, args, ctx) => {
  const testToUpdate: Test = await testModel.findById(args.id).then(
    test => test,
    error => {
      getLogger().error(`Error updating the test. Details: ${error}`);
      return null;
    }
  );

  if (!testToUpdate) {
    throw new Error(`Couldn't update test. No test found.`);
  }

  if (args.testname) {
    const testsWithTestname: Test[] = await testModel
      .find({ testname: args.testname })
      .catch(error => {
        getLogger().error(`Error validating testname. Details: ${error}`);
        return null;
      });

    if (testsWithTestname === null) {
      throw new Error(
        `Couldn't update the test. Cannot determine if testname is repeated.`
      );
    } else if (
      testsWithTestname.length &&
      testsWithTestname[0].id !== args.id
    ) {
      // The testname is already used
      throw new Error(
        `Couldn't update test since there is already a test with testname equals to ${
        args.testname
        }`
      );
    }
  }

  return performSave(testToUpdate, args);
};
