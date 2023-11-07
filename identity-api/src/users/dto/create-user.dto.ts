import { Rule } from '../entitie/user';

export class CreateUserDto {
  userId?: string;
  userName: string;
  password: string;
  rule?: Rule;
  createdAt?: Date;
}
