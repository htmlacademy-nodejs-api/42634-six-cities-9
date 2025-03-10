import {User, UserVariant} from '../../types/user.type.js';
import {defaultClasses, getModelForClass, modelOptions, prop, Severity} from '@typegoose/typegoose';
import {createSHA256} from '../../helpers/createSHA256.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }, options: {
    allowMixed: Severity.ALLOW
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, default: ''})
  public name: string;

  @prop({required: true, unique: true})
  public email: string;

  @prop({required: false, default: ''})
  public avatar?: string;

  @prop({required: true, default: ''})
  public password: string;

  @prop({required: true})
  public userType: UserVariant;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
