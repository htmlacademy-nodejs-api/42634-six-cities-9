import { Schema, Document, model } from 'mongoose';
import {User} from '../../types/user.type.js';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  name: String,
  email: {type: String, unique: true, required: true},
  avatar: {type: String, required: false},
  password: String,
  userType: {type: String, enum: ['standard', 'pro'], required: true},
});

export const UserModel = model<UserDocument>('User', userSchema);
