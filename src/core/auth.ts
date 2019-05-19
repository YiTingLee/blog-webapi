import { Context } from './context';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const auth = async (resolve, preObj, args, context: Context, info) => {
  try {
    const token = context.Authorization.replace('Bearer ', '');
    const decoded:any = jwt.verify(token, 'mytoken');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    context.user = user;
    return resolve();
  } catch (e) {
    throw new Error("Please authenticate.");
  }
}
