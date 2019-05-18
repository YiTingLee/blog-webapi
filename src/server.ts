import { resolvers } from './core/resolvers';
import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import { context } from './core/context';
import('./db/db');

// Construct a schema, using GraphQL schema language
const typeDefs = importSchema(__dirname + '/schemas/schema.graphql')

const server = new GraphQLServer({ typeDefs, resolvers, context });
server.start({
  port: 3000
}, () => console.log('Server is running on localhost:3000'));
