import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidToken extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.UNAUTHORIZED,
          message: 'Invalid token ',
        },
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
