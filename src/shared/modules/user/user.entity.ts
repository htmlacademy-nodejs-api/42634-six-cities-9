import {User, UserVariant} from '../../types/user.type.js';
import {defaultClasses, getModelForClass, prop} from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
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
