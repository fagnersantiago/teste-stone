import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InactiveOrInativeOccupation } from '../inative-or- not-found-occupation';
import { InvalidAge } from '../invalid-age';
import { InvalidCaptial } from '../invalid-capital';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const response = context.switchToHttp().getResponse();

        switch (true) {
          case error instanceof InactiveOrInativeOccupation:
            response
              .status(HttpStatus.BAD_REQUEST)
              .json(new InactiveOrInativeOccupation().getResponse());
            break;

          case error instanceof InvalidAge:
            response
              .status(HttpStatus.BAD_REQUEST)
              .json(new InvalidAge().getResponse());
            break;

          case error instanceof InvalidCaptial:
            response
              .status(HttpStatus.UNPROCESSABLE_ENTITY)
              .json(new InvalidCaptial().getResponse());
            break;

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
