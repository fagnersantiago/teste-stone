import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserIsNotAdmin } from '../errors/user-not-admin';
import { InvalidToken } from '../errors/invalid-token';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new InvalidToken();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      const isAdmin = (decoded as any)?.role === 'ADMIN';

      if (!isAdmin) {
        throw new UserIsNotAdmin();
      } else {
        (req as any).user = decoded;
        next();
      }
    } catch (error) {
      console.log(error);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
