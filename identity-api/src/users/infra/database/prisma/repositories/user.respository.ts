import { ChangeRoleUsersDto } from 'src/users/dto/change-role.users.dto';
import { CreateUserDto } from '../../../../dto/create-user.dto';
import { User } from '../../../../entitie/user';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User | null>;
  abstract findByUserName(userName: string): Promise<User | null>;
  abstract isValidPassword(password: string): Promise<boolean>;
  abstract update({
    userId,
    userName,
    rule,
  }: ChangeRoleUsersDto): Promise<User>;
  abstract findByUserId(userId: string): Promise<User | null>;
  abstract isAdmin(userId: string): Promise<boolean>;
}
