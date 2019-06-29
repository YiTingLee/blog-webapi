import * as mongoose from 'mongoose';

mongoose.connect('mongodb://mongo:27017/blog', {
  useNewUrlParser: true,
  useCreateIndex: true
});
