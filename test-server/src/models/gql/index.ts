import { gql } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

// Own
// Types
import { GQLTypes } from 'mdk-services-interface';

const typesArray = fileLoader(path.join(__dirname, './type-defs'));
// Optionally add the status field to the graph types.
typesArray.push(GQLTypes.status);
export default gql`
  ${mergeTypes(typesArray, { all: true })}
`;
