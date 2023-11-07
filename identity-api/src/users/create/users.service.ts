import { UserRepository } from '../infra/database/prisma/repositories/user.respository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserAlreadyExists } from '../errors/user-already-exists.error';
import { PasswordValidator } from '../errors/password-validator';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private userRository: UserRepository) {}

  async execute({ userName, password }: CreateUserDto) {
    const userExists = await this.userRository.findByUserName(userName);

    if (userExists) {
      throw new UserAlreadyExists();
    }

    const isValidPassword = await this.userRository.isValidPassword(password);

    if (!isValidPassword) {
      throw new PasswordValidator();
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRository.create({
      userName,
      password: passwordHash,
    });

    return user;
  }
}
