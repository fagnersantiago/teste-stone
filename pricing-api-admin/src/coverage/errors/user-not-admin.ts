import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsNotAdmin extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.FORBIDDEN,
          message:
            'Unauthorized! Only admin can create delete and update coverage',
        },
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
