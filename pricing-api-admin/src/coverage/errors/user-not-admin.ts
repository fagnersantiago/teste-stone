import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsNotAdmin extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.FORBIDDEN,
          message: 'Unauthorized! Only admin can change users role',
        },
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
