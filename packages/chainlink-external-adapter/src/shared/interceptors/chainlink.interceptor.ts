import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Request } from 'express';
import { AdapterError } from '@chainlink/external-adapter';
import { MaxAttemptsError } from 'typescript-retry-decorator';
import { JsonRpcError } from 'filecoin.js/builds/dist/connectors/Connector';

@Injectable()
export class ChainlinkInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ChainlinkInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { jobRunID } = request.body;

    return next.handle().pipe(
      map((data) => ({ jobRunID, data })),
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
