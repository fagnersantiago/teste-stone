import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).send('Token inválido');
        }
        req.user = decoded;
        next();
      });
    } else {
      res.status(401).send('Token não fornecido');
    }
  }
}
