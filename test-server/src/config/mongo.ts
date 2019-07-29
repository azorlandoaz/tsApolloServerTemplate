import mongoose, { Mongoose } from 'mongoose';

// Own
// Constants
import {
  CONNECTION_STRING,
  POOL_SIZE,
  CONNECT_TIMEOUT,
  SOCKET_TIMEOUT
} from '@app/common/constants/mongo';

/**
 * Performs the connection to Mongo.
 */
export const connectDB = (): Promise<Mongoose> => {
  return mongoose.connect(CONNECTION_STRING, {
    poolSize: POOL_SIZE, // Maintain up to 1 socket connections
    connectTimeoutMS: CONNECT_TIMEOUT, // Give up initial connection after 10 seconds
    socketTimeoutMS: SOCKET_TIMEOUT // Close sockets after 45 seconds of inactivity
  });
};
