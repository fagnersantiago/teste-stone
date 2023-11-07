import { Controller, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ChangeRoleUsersService } from './update.role.users.service';
import { AuthGuard } from '@nestjs/passport';
import { ChangeRoleUsersDto } from '../dto/change-role.users.dto';
import { AccessGuard } from '../auth/strategies/access.guards';
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class ChangeRoleUsersController {
  constructor(private updateRoleUserService: ChangeRoleUsersService) {}

  @Patch('/:userId')
  @UseGuards(AccessGuard)
  async handle(
    @Param('userId') userId: string,
    @Body()
    body: ChangeRoleUsersDto,
  ) {
    const { rule } = body;

    const createUser = await this.updateRoleUserService.execute({
      userId,
      rule,
    });

    return {
      data: {
        userId: createUser.userId,
        userName: createUser.userName,
        rule: createUser.rule,
      },
    };
  }
}
