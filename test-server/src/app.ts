import { inspect } from 'util'; // or directly
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

// Own
// Config
import { loadEnvironmentVariables } from '@app/config/app';
const environmentLoaded = loadEnvironmentVariables();
import { connectDB } from '@app/config/mongo';
import { useApolloServer } from '@app/config/apollo-server';
// Constants
import { SERVER } from '@app/common/constants/general';
// Utils
import getLogger, { logIncomingRequest } from '@app/common/util/logger';
// Types
import typeDefs from '@app/models/gql';
import resolvers from '@app/models/gql/resolvers';
import { sendError } from '@app/common/util/functions';
// Routes
import docsRouter from '@app/routes/type-doc';

// Show the environment file used
getLogger().info(
  `Using ${environmentLoaded} environment to supply config environment variables`
);

connectDB()
  .then(() => {
    getLogger().info(`Mongo DB connected.`);
  })
  .catch(error => {
    getLogger().error(`Couldn't connect DB. Details: ${error}`);
    process.exit(1);
  });

// Create Express server
const app = express();

// Express configuration
app.set('port', SERVER.port || 3000);
app.use('*', cors());
app.use(logIncomingRequest);

useApolloServer(app, typeDefs, resolvers);
app.use(docsRouter); // If the request wasn't graphql then try to serve the docs

// Custom error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  getLogger().error(`Unhandled error catched. Details: ${inspect(err)}`);

  if (res.headersSent) {
    return next(err);
  }

  sendError(
    res,
    `An error ocurred in the process of the API. Details: ${err.message}`
  );
});

export default app;
