import { getConfigValue, isNumber } from '@app/common/util/functions';

const mongoConnectionString = getConfigValue('MONGO_CONNECTION_STRING');

if (!mongoConnectionString) {
  throw new Error(
    `Cannot initialize mongo constants due lack of config values.
    None mongo connection string was found in environment values.`
  );
}

let poolSize: string | number = getConfigValue('POOL_SIZE');

if (!isNumber(poolSize)) {
  throw new Error(
    `Cannot initialize mongo constants due lack of config values.
    POOL_SIZE must be a valid integer.`
  );
}

poolSize = parseInt(poolSize, 10);

let connectTimeout: string | number = getConfigValue('CONNECT_TIMEOUT');

if (!isNumber(connectTimeout)) {
  throw new Error(
    `Cannot initialize mongo constants due lack of config values.
    CONNECT_TIMEOUT must be a valid integer.`
  );
}

connectTimeout = parseInt(connectTimeout, 10);

let socketTimeout: string | number = getConfigValue('SOCKET_TIMEOUT');

if (!isNumber(socketTimeout)) {
  throw new Error(
    `Cannot initialize mongo constants due lack of config values.
    SOCKET_TIMEOUT must be a valid integer.`
  );
}

socketTimeout = parseInt(socketTimeout, 10);

// Set the constants with validated values

export const CONNECTION_STRING = mongoConnectionString;
export const POOL_SIZE = poolSize;
export const CONNECT_TIMEOUT = connectTimeout;
export const SOCKET_TIMEOUT = socketTimeout;
