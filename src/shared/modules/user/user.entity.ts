import {User, UserVariant} from '../../types/user.type.js';

export class UserEntity implements User {
  public name: string;
  public email: string;
  public avatar?: string;
  public password: string;
  public userType: UserVariant;
}
