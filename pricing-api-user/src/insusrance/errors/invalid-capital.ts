import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCapital extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message:
            'Invalid capital. It must be between R$10000 and R$10000000.  ',
        },
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
