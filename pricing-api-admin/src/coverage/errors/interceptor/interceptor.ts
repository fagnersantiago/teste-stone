import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CovegareAlreadyExists } from '../coverage-already-exists.error';
import { PasswordValidator } from '../password-validator';
import { CoverageNotFound } from '../coverage-not-found';
//import { UserIsNotAdmin } from '../user-not-admin';
//import { InvalidUsernameOrPassword } from '../invalid-user-or-password';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const response = context.switchToHttp().getResponse();

        switch (true) {
          case error instanceof CovegareAlreadyExists:
            response
              .status(HttpStatus.CONFLICT)
              .json(new CovegareAlreadyExists().getResponse());
            break;

          case error instanceof PasswordValidator:
            response
              .status(HttpStatus.UNPROCESSABLE_ENTITY)
              .json(new PasswordValidator().getResponse());
            break;

          case error instanceof CoverageNotFound:
            response
              .status(HttpStatus.NOT_FOUND)
              .json(new CoverageNotFound().getResponse());
            break;

          // case error instanceof UserIsNotAdmin:
          //   response
          //     .status(HttpStatus.FORBIDDEN)
          //     .json(new UserIsNotAdmin().getResponse());
          // break;
          // case error instanceof InvalidUsernameOrPassword:
          //   response
          //     .status(HttpStatus.UNAUTHORIZED)
          //     .json(new InvalidUsernameOrPassword().getResponse());
          //   break;

          default:
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              error: {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              },
            });
            break;
        }

        return throwError(error);
      }),
    );
  }
}
