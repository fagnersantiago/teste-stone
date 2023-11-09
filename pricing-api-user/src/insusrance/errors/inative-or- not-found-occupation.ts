import { HttpException, HttpStatus } from '@nestjs/common';

export class InativeOrInativeOccupation extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.BAD_REQUEST,
          message: 'Occupation inative or not found',
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
