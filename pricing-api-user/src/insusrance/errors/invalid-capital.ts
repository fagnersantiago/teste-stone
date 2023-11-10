import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCapital extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message:
            'Invalid capital. It must be between R$10,000 and R$10,000,000.  ',
        },
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
