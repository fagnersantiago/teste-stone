import { UserRepository } from '../infra/database/prisma/repositories/user.respository';
import { Injectable } from '@nestjs/common';
import { UserNotFound } from '../errors/user-not-found';
import { ChangeRoleUsersDto } from '../dto/change-role.users.dto';
//import { UserIsNotAdmin } from '../errors/user-not-admin';

@Injectable()
export class ChangeRoleUsersService {
  constructor(private changeRoleUsers: UserRepository) {}

  async execute({ userId, rule }: ChangeRoleUsersDto) {
    const userExists = await this.changeRoleUsers.findByUserId(userId);

    if (!userExists) {
      throw new UserNotFound();
    }

    await this.changeRoleUsers.isAdmin(userExists.userId);

    const user = await this.changeRoleUsers.update({
      userId,
      rule,
    });

    return user;
  }
}
