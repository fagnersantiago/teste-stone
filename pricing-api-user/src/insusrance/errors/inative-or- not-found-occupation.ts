import { HttpException, HttpStatus } from '@nestjs/common';

export class InactiveOrInativeOccupation extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.BAD_REQUEST,
          message: 'Occupation incative or not found',
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
