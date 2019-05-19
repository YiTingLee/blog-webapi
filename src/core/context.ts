import { User } from '../models/user.model'
import { Model } from 'mongoose';
import { Post } from '../models/post.model';

export interface UserModel extends Model<any> {
  findByCredentials(account: string, password: string): any
}

export interface Context {
  UserModel: UserModel;
  PostModel: Model<any>;
  Authorization: string;
  user?: any;
}

export function context({ req }): Context {
  return {
    UserModel: User,
    PostModel: Post,
    Authorization: req.request.headers.authorization
  }
}
