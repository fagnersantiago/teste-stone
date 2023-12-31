import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AccessGuard } from '../auth/strategies/access.guards';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  @UseGuards(AccessGuard)
  async handle(@Body() body: CreateUserDto) {
    const { userName, password } = body;

    const createUser = await this.usersService.execute({
      userName,
      password,
    });

    return {
      data: {
        userId: createUser.userId,
        userName: createUser.userName,
        role: createUser.rule,
      },
    };
  }
}
