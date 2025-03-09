import {User, UserVariant} from '../../types/user.type.js';
import {getModelForClass, prop} from '@typegoose/typegoose';

export class UserEntity implements User {
  @prop({required: true, unique: true})
  public name: string;

  @prop({required: true, unique: true})
  public email: string;

  @prop({required: false, default: ''})
  public avatar?: string;

  @prop({required: true})
  public password: string;

  @prop({required: true})
  public userType: UserVariant;
}

export const UserModel = getModelForClass(UserEntity);
