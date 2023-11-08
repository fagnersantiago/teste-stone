import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidOrInativeOccupation extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.BAD_REQUEST,
          message: 'Inactive or invalid occupation',
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
