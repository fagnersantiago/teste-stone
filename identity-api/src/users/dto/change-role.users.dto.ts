import { Rule } from '@prisma/client';

export class ChangeRoleUsersDto {
  userId?: string;
  userName?: string;
  rule: Rule;
}
