import { User } from '../models/user.model'
import { Model } from 'mongoose';

export interface Context {
  UserModel: Model<any>;
}

export const context: Context = {
  UserModel: User
}
