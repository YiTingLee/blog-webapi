import * as validator from 'validator';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UserModel } from '../core/context';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  account: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
      return true;
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'mytoken');

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

userSchema.statics.findByCredentials = async (account, password) => {
  const user = await User.findOne({ account });

  if (!user) {
    throw new Error('Cannot find the user');
  }

  const isMatch = await bcrypt.compare(password, user['password']);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
}

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user['password'] = await bcrypt.hash(user['password'], 8);
  }

  next();
})

const User = mongoose.model('User', userSchema) as UserModel;

export { User };
