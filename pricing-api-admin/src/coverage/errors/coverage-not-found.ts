import { HttpException, HttpStatus } from '@nestjs/common';

export class CoverageNotFound extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.NOT_FOUND,
          message: 'Coverage not found',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
