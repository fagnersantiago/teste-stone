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

    if (!this.isValidTokenStructure(token)) {
      throw new InvalidToken();
    }

    try {
      const decoded = jwt.decode(token);

      const isAdmin = (decoded as any)?.role === 'ADMIN';

      if (!isAdmin) {
        throw new UserIsNotAdmin();
      } else {
        (req as any).user = decoded;
        next();
      }
    } catch (error) {
      throw new InvalidToken();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isValidTokenStructure(token: string): boolean {
    try {
      const decoded = jwt.decode(token);
      return !!decoded && (decoded as any)?.role !== undefined;
    } catch (error) {
      return false;
    }
  }
}
