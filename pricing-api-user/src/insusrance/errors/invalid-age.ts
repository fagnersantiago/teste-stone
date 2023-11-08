import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAge extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.BAD_REQUEST,
          message: 'Invalid age. Must be between 18 and 60 years old.',
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
