import { auth } from './auth';
export const permissions = {
  Query: {
    getUser: auth,
    getUsers: auth,
    getPost: auth,
    getPosts: auth,
  },
  Mutation: {
    updateUser: auth,
    deleteUser: auth,
    createPost: auth,
    updatePost: auth,
    deletePost: auth,
    logout: auth
  }
}
