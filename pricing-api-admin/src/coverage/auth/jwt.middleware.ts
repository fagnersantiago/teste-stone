import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserIsNotAdmin } from '../errors/user-not-admin';
import { InvalidToken } from '../errors/invalid-token';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      jwt.verify(token, process.env.JWT_PUBLIC_KEY, (err, decoded) => {
        if (err) {
          throw new InvalidToken();
        }

        req.user = decoded;

        const isAdmin = decoded?.role == 'ADMIN';

        if (!isAdmin) {
          throw new UserIsNotAdmin();
        } else {
          next();
        }
      });
    } else {
      res.status(401).send('Token não fornecido');
    }
  }
}
