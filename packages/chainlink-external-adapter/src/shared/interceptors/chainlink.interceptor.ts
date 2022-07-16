import { AdapterError } from '@chainlink/external-adapter';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MaxAttemptsError } from 'typescript-retry-decorator';

@Injectable()
export class ChainlinkInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ChainlinkInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const jobRunID = request.body.jobRunID || request.query.jobRunID || '1';

    return next.handle().pipe(
      map((data) => ({ jobRunID, ...data })),
      catchError((err) => {
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = err.message;

        if (err instanceof HttpException) {
          statusCode = err.getStatus();
          message = err.getResponse()['message'];
          this.logger.warn(`${err.name}: ${message}`);
        } else if (err instanceof MaxAttemptsError) {
          message = err.message.split('Original Error: ')[1];
          this.logger.error(err.stack);
        } else if (err instanceof Error) {
          this.logger.error(err.stack);
        }

        return of(
          new AdapterError({
            jobRunID,
            statusCode,
            message: message || err.message,
            name: err.name,
          }).toJSONResponse(),
        );
      }),
    );
  }
}
