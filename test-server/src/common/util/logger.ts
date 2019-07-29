import winston, { Logger, LoggerInstance } from 'winston';
import { Request, Response, NextFunction } from 'express';

// Own
// Constants
import {
  ENVIRONMENTS,
  getCurrentEnvironment
} from '@app/common/constants/environments';
// Utils
import { getNow, incomingHTTPHeadersToObj } from '@app/common/util/functions';

let _logger: LoggerInstance;
const LOG_FILENAME = 'debug.log';

export const getLogger = (): LoggerInstance => {
  if (!_logger) {
    _logger = new Logger({
      levels: winston.config.npm.levels,
      transports: [
        new winston.transports.Console({
          level:
            getCurrentEnvironment() === ENVIRONMENTS.Prod ? 'info' : 'silly'
        }),
        new winston.transports.File({ filename: LOG_FILENAME, level: 'silly' })
      ]
    });

    if (getCurrentEnvironment() !== ENVIRONMENTS.Prod) {
      _logger.debug('Logging initialized at debug level');
    }
  }

  return _logger;
};

/**
 * Knows how to log in a pretty format the incoming request.
 * @param req
 * @param res
 * @param next
 */
export const logIncomingRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = 'Request received with:\r\n';
  message += `  url = ${req.originalUrl}\r\n`;
  message += `  method = ${req.method}\r\n`;
  message += `  from ${req.ip}\r\n`;
  message += `  date = ${getNow()}\r\n`;
  message += `  headers:\r\n`;

  const headers = incomingHTTPHeadersToObj(req.headers);

  for (const headerName in headers) {
    if (headers.hasOwnProperty(headerName)) {
      message += `    ${headerName}: ${headers[headerName]}`;
      message += '\r\n';
    }
  }

  getLogger().info(message);
  next();
};

export default getLogger;
