import { Schema, Document, model } from 'mongoose';
import {User} from '../../types/user.type.js';

const EMAIL_PATTERN = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    minlength: [4, 'Min length for name path is 4'],
    required: true
  },
  email: {
    type: String,
    unique: true,
    match: [EMAIL_PATTERN, 'Email is incorrect'],
    required: true
  },
  avatar: {
    type: String,
    minlength: [5, 'Min length for avatar path is 5'],
    required: false
  },
  password: {
    type: String,
    minlength: [6, 'Min length for password path is 6'],
    required: true
  },
  userType: {
    type: String,
    enum: ['standard', 'pro'],
    required: true
  },
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
