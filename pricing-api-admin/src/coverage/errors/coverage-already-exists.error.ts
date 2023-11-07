import { HttpException, HttpStatus } from '@nestjs/common';

export class CovegareAlreadyExists extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.CONFLICT,
          message: 'Coverage Already Exists',
        },
      },
      HttpStatus.CONFLICT,
    );
  }
}
