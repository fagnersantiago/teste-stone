import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InvalidToken } from 'src/users/errors/invalid-token';
import { UserIsNotAdmin } from 'src/users/errors/user-not-admin';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.headers.authorization;
      console.log(token);
      if (!token) {
        throw new InvalidToken();
      }

      const decoded: any = jwt.decode(token.replace('Bearer ', ''));

      if (decoded && decoded.role !== 'ADMIN') {
        throw new UserIsNotAdmin();
      }

      return true;
    } catch (error) {
      if (error instanceof InvalidToken || error instanceof UserIsNotAdmin) {
        throw error;
      }

      return false;
    }
  }
}
