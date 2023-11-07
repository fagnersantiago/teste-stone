import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordValidator extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          message:
            'the password must have between 8 64 characters. Contain upper and lower case letters, numbers and at least one of the following symbols @#!$%',
        },
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
