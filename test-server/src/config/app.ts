import fs from 'fs';
import dotenv from 'dotenv';

// Own
// Constants
import {
  ENVIRONMENT_FILENAME,
  getCurrentEnvironment
} from '@app/common/constants/environments';
// Utils
import { getLogger } from '@app/common/util/logger';

// Set the flag that determines whether the configuration is taken from the configuration file.
let configFileRead = false;

/**
 * This function should be called once the server is being setting up
 * @returns the environment used.
 * @throws Error if the execution demands that the config file must be read and such file isn't found.
 */
export const loadEnvironmentVariables = (): string => {
  if (configFileRead) {
    // The config values are already established.
    getLogger().warning(
      'Trying to load environment variables when they were already loaded. Some code tried to load again environment variables.'
    );
    return;
  }

  if (process.env.READ_ENV_FILE === 'true') {
    if (!fs.existsSync(ENVIRONMENT_FILENAME)) {
      // The config file doesn't exists in an execution where demands it so throw an Error.
      throw new Error(
        `Cannot load environment variables since none config file was found with name ${ENVIRONMENT_FILENAME}`
      );
    }

    dotenv.config({ path: ENVIRONMENT_FILENAME });
    configFileRead = true;
    getLogger().info(
      `Environment variables added from config file ${ENVIRONMENT_FILENAME}.`
    );
  }

  return getCurrentEnvironment();
};
