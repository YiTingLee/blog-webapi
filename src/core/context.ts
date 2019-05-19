import { User } from '../models/user.model'
import { Model } from 'mongoose';
import { Post } from '../models/post.model';

export interface Context {
  UserModel: Model<any>;
  PostModel: Model<any>;
}

export const context: Context = {
  UserModel: User,
  PostModel: Post
}
