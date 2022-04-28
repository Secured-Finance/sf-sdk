import { ExecutionContext, HttpException } from '@nestjs/common';
import { lastValueFrom, of, throwError } from 'rxjs';
import { MaxAttemptsError } from 'typescript-retry-decorator';
import { ChainlinkInterceptor } from './chainlink.interceptor';

describe('ChainlinkInterceptor', () => {
  let interceptor: ChainlinkInterceptor;
  const context: ExecutionContext = {
    switchToHttp: jest.fn().mockReturnThis(),
    getRequest: jest.fn().mockReturnThis(),
    body: {},
    query: {},
  } as unknown as ExecutionContext;

  const callHandler = {
    handle: jest.fn(),
  };

  beforeEach(async () => {
    interceptor = new ChainlinkInterceptor();
  });

  describe('intercept', () => {
    it('should return data', async () => {
      (
        context.switchToHttp().getRequest as jest.Mock<any, any>
      ).mockReturnValueOnce({
        body: { jobRunID: 'testId' },
      });

      callHandler.handle.mockReturnValueOnce(of({ data: 'test' }));

      const res = await lastValueFrom(
        interceptor.intercept(context, callHandler),
      );
      expect(res).toEqual({ jobRunID: 'testId', data: 'test' });
    });

    it('should return error: HttpException', async () => {
      callHandler.handle.mockReturnValueOnce(
        throwError(() => new HttpException('test', 400)),
      );

      const res = await lastValueFrom(
        interceptor.intercept(context, callHandler),
      );
      expect(res).toEqual({
        jobRunID: '1',
        status: 'errored',
        statusCode: 400,
        error: {
          message: 'test',
          name: 'HttpException',
        },
      });
    });

    it('should return error: MaxAttemptsError', async () => {
      callHandler.handle.mockReturnValueOnce(
        throwError(() => new MaxAttemptsError('test')),
      );

      const res = await lastValueFrom(
        interceptor.intercept(context, callHandler),
      );
      expect(res).toEqual({
        jobRunID: '1',
        status: 'errored',
        statusCode: 500,
        error: {
          message: 'test',
          name: 'Error',
        },
      });
    });

    it('should return error: Error', async () => {
      callHandler.handle.mockReturnValueOnce(
        throwError(() => new Error('test')),
      );

      const res = await lastValueFrom(
        interceptor.intercept(context, callHandler),
      );
      expect(res).toEqual({
        jobRunID: '1',
        status: 'errored',
        statusCode: 500,
        error: {
          message: 'test',
          name: 'Error',
        },
      });
    });
  });
});
