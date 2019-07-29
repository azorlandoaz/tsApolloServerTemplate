// Own
// Utils
import { getConfigValue } from '@app/common/util/functions';

const prefixErrorMessage =
  'Cannot initialize general constants due lack of config values.';

// Validates the values to be set

const _port = getConfigValue('PORT');
if (!_port) {
  throw new Error(`${prefixErrorMessage} No server port specified.`);
}

if (isNaN(_port as any)) {
  throw new Error(`${prefixErrorMessage} The server port isn't a number.`);
}

const _hashSecretKey = getConfigValue('HASH_SECRET_KEY');
if (!_hashSecretKey) {
  throw new Error(`${prefixErrorMessage} No HASH_SECRET_KEY specified.`);
}

const _apiGatewayUrl = getConfigValue('API_GATEWAY_URL');
if (!_apiGatewayUrl) {
  throw new Error(`${prefixErrorMessage} No API_GATEWAY_URL specified.`);
}

// Set the constants with validated values

export const SERVER = {
  port: parseInt(_port, 10)
};

export const HASH_SECRET_KEY = _hashSecretKey;
export const API_GATEWAY_URL = _apiGatewayUrl;
