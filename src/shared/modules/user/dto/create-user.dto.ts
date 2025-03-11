import {UserVariant} from '../../../types/user.type.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatar?: string;
  public password: string;
  public userType: UserVariant;
}
