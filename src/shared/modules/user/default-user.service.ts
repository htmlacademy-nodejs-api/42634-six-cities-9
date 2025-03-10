import {UserService} from './user-service.interface.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {UserEntity, UserModel} from './user.entity.js';

export class DefaultUserService implements UserService {
  public async create(dto: CreateUserDto, salt: string) {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    return UserModel.create(user);
  }

  public async findByEmail(email: string) {

  }

  public async findOrCreate(dto: CreateUserDto, salt: string) {

  }
}
