// @flow
import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    hidden: true,
  },
  email: {
    type: String,
    required: false,
    index: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  collection: 'adminUser',
});

export default mongoose.model('AdminUser', Schema);
