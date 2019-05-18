import { GraphQLServer } from 'graphql-yoga';
import { importSchema } from 'graphql-import';
import { context } from './core/context';
import('./db/db');

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
    async getUsers(preObj, args, context, info) {
      const users = context.UserModel.find({});
      return users;
    },
    login(preObj, args, context, info) {
      return [user];
    }
  },
  Mutation: {
    async createUser(preObj, args, context, info) {
      const user = new context.UserModel(args.request);

      try {
        await user.save();
      } catch (e) {
        return e;
      }
      return true;
    },
    async updateUser(preObj, args, context, info) {
      // TODO: it will be implemented later.
      const user = await context.UserModel.findOne({ _id: args.request.id });
      if (!user) {
        throw Error('user is not found');
      }
      return user;
    },
    async deleteUser(preObj, args, context, info) {
      const user = await context.UserModel.findOne({ _id: args.request.id });
      if (!user) {
        throw Error('user is not found');
      }
      user.remove();
      return true;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers, context });
server.start({
  port: 3000
}, () => console.log('Server is running on localhost:3000'));
