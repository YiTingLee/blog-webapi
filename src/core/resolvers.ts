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
      const users = await context.UserModel.find({});
      return users;
    },
    async login(preObj, args, context: Context, info) {
      const user = await context.UserModel.findByCredentials(args.request.account, args.request.password);
      const token = await user.generateAuthToken();
      const { _id, name, account, password, email } = user;
      return { id: _id, name, account, password, email, token };
    },
    async getPost(preObj, args, context: Context, info) {
      const post = await context.PostModel.findOne({ _id: args.request.id });
      if (!post) {
        throw Error('post is not found');
      }
      return post;
    },
    async getPosts(preObj, args, context: Context, info) {
      const posts = await context.PostModel.find({ userId: args.request.id });
      return posts;
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
      const user = await context.UserModel.findOne({ _id: args.request.id });
      if (!user) {
        throw Error('user is not found');
      }
      const allowedUpdates = ['name', 'email', 'password'];
      const updates = Object.keys(args.request).filter(key => allowedUpdates.includes(key));

      try {
        updates.forEach(update => user[update] = args.request[update]);
        await user.save();
      } catch (e) {
        throw Error(e);
      }
      return true;
    },
    async deleteUser(preObj, args, context: Context, info) {
      const user = await context.UserModel.findOne({ _id: args.request.id });
      if (!user) {
        throw Error('user is not found');
      }
      user.remove();
      return true;
    },
    async createPost(preObj, args, context: Context, info) {
      const { title, body, userId } = args.request;
      const post = new context.PostModel({ title, body, userId });

      try {
        await post.save();
      } catch (e) {
        return e;
      }
      return true;
    },
    async updatePost(preObj, args, context: Context, info) {
      const post = await context.PostModel.findOne({ _id: args.request.id });
      if (!post) {
        throw Error('post is not found');
      }
      const allowedUpdates = ['title', 'body'];
      const updates = Object.keys(args.request).filter(key => allowedUpdates.includes(key));

      try {
        updates.forEach(update => post[update] = args.request[update]);
        await post.save();
      } catch (e) {
        throw Error(e);
      }
      return true;
    },
    async deletePost(preObj, args, context: Context, info) {
      const post = await context.PostModel.findOne({ _id: args.request.id });
      if (!post) {
        throw Error('post is not found');
      }
      post.remove();
      return true;
    },
    async logout(preObj, args, context: Context, info) {
      const token = context.Authorization.replace('Bearer ', '');
      context.user.tokens = context.user.tokens.filter(item => item.token !== token);
      try {
        await context.user.save();
      } catch (e) {
        return e;
      }
      return true;
    }
  }
};
