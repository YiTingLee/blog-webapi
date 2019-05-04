import * as mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
  useNewUrlParser: true,
  useCreateIndex: true
});
