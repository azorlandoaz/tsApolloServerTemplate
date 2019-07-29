import { IncomingHttpHeaders } from 'http';
import { Response } from 'express';

// Own
// Utils
import { getLogger } from '@app/common/util/logger';

/**
 * Gives the current date and time. E.g "10/17/2018 at 11:31:16 AM"
 */
export const getNow = (): string => {
  const currentDate = new Date();
  return `${currentDate.toLocaleDateString(
    'en-US'
  )} at ${currentDate.toLocaleTimeString('en-US')}`;
};

/**
 * Given an IncomingHttpHeaders instance it returns the headers as:
 * [
 *  <header name> = <header value>,
 *  <header name> = <header value>,
 *  ...
 * ]
 */
export const incomingHTTPHeadersToAssocArray = (
  incomingHTTPHeaders: IncomingHttpHeaders
): string[] => {
  const headers = [];

  for (const headerName in incomingHTTPHeaders) {
    if (incomingHTTPHeaders.hasOwnProperty(headerName)) {
      headers[headerName] = incomingHTTPHeaders[headerName];
    }
  }

  return headers;
};

/**
 * Given an IncomingHttpHeaders instance it returns the headers as:
 * {
 *  <header name> = <header value>,
 *  <header name> = <header value>,
 *  ...
 * }
 */
export const incomingHTTPHeadersToObj = (
  incomingHTTPHeaders: IncomingHttpHeaders
): { [index: string]: string } => {
  const headers = {};

  for (const headerName in incomingHTTPHeaders) {
    if (incomingHTTPHeaders.hasOwnProperty(headerName)) {
      headers[headerName] = incomingHTTPHeaders[headerName];
    }
  }

  return headers;
};

/**
 * Given a key it returns the value from the environment values.
 * The key must follow the convention of nesting as dot separated. Eg:
 * @param configValueName The config value name to get from environment values.
 * @param muteLog Whether log an error if the environment value wasn't found. Default to false.
 * @returns String if the value was found otherwise undefined.
 */
export const getConfigValue = (
  configValueName: string,
  muteLog = false
): string | undefined => {
  if (
    !process.env.hasOwnProperty(configValueName) ||
    !process.env[configValueName].trim().length
  ) {
    if (!muteLog) {
      getLogger().error(
        `Tried to get environment variable ${configValueName} but wasn't found.`
      );
    }
    return undefined;
  }

  return process.env[configValueName];
};

/**
 * Send a error. Use this function to send the error uniformly.
 * @param res The express response to send.
 * @param status Desired http status. Default 500.
 * @param message Desired message. Default 'Internal server error.'
 */
export const sendError = (
  res: Response,
  message: string = 'Internal server error.',
  status: number = 500
) => {
  const _response = {
    error: message
  };

  res.status(status);
  res.type('json');
  res.send(_response);
};

export const isObject = (thing: any) => {
  return typeof thing === 'object' && thing !== null;
};

export function cloneObject<T>(obj): T {
  const clone = JSON.parse(JSON.stringify(obj));
  return clone as T;
}

/**
 * Returns `true` if `n` is a valid number. I.e this value can be parsed by `parseInt` or `parseFloat`.
 */
export function isNumber(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
