import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import { User } from './models/user.model';
require('./db/db');

// Construct a schema, using GraphQL schema language
const typeDefs = importSchema(__dirname + '/schemas/schema.graphql')

const user = {
  id: '1',
  name: 'eric',
  account: 'eric account',
  password: 'eric password',
  email: 'eric@email.com'
};
// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    getUser(preObj, args, context, info) {
      return user;
    },
    getUsers(preObj, args, context, info) {
      return [user];
    }
  },
  Mutation: {
    createUser(preObj, args, context, info) {
      return user;
    },
    updateUser(preObj, args, context, info) {
      return user;
    },
    deleteUser(preObj, args, context, info) {
      return user;
    }
  }
};

const context = {
  userDb: User
}

const server = new GraphQLServer({ typeDefs, resolvers, context });
server.start({
  port: 3000
}, () => console.log('Server is running on localhost:3000'));
