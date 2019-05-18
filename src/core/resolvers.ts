import { Context } from './context';
const user = {
  id: '1',
  name: 'eric',
  account: 'eric account',
  password: 'eric password',
  email: 'eric@email.com'
};

export const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    async getUser(preObj, args, context: Context, info) {
      const user = await context.UserModel.findOne({ _id: args.request.id });
      if (!user) {
        throw Error('user is not found');
      }
      return user;
    },
    async getUsers(preObj, args, context: Context, info) {
      const users = context.UserModel.find({});
      return users;
    },
    login(preObj, args, context: Context, info) {
      return [user];
    }
  },
  Mutation: {
    async createUser(preObj, args, context: Context, info) {
      const user = new context.UserModel(args.request);

      try {
        await user.save();
      } catch (e) {
        return e;
      }
      return true;
    },
    async updateUser(preObj, args, context: Context, info) {
      // TODO: it will be implemented later.
      const user = await context.UserModel.findOne({ _id: args.request.id });
      if (!user) {
        throw Error('user is not found');
      }
      return user;
    },
    async deleteUser(preObj, args, context: Context, info) {
      const user = await context.UserModel.findOne({ _id: args.request.id });
      if (!user) {
        throw Error('user is not found');
      }
      user.remove();
      return true;
    }
  }
};
