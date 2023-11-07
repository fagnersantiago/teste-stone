import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserIsNotAdmin } from 'src/users/errors/user-not-admin';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.rule !== 'ADMIN') {
      throw new UserIsNotAdmin();
    }

    return true;
  }
}
