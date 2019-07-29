import { Application } from 'express';
import { ApolloServer, IResolvers } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

// Own
// Services
import { buildGQLContext } from 'mdk-services-interface';
// Constants
import {
  ENDPOINT as APOLLO_ENDPOINT,
  INTROSPECTION_ENABLED,
  PLAYGROUND
} from '@app/common/constants/apollo';

/**
 * Given an express application and type-defs and resolvers it attach an apollo server.
 * See env.example fot apollo server configuration.
 */
export const useApolloServer = (
  app: Application,
  typeDefs: DocumentNode | DocumentNode[],
  resolvers: IResolvers<any, any>
): void => {
  const apolloApp = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => buildGQLContext(req) as any,
    introspection: INTROSPECTION_ENABLED,
    playground: !PLAYGROUND.enabled
      ? false
      : {
          endpoint: PLAYGROUND.endpoint
        }
  });

  apolloApp.applyMiddleware({ app, path: APOLLO_ENDPOINT });
};
