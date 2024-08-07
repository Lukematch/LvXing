import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Request, Response} from 'express'
import { ApiException } from './api.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request= ctx.getRequest<Request>()
    const status = exception.getStatus()

    if (exception instanceof ApiException) {
      response.status(status).json({
        code: exception.getErrorCode(),
        timestamp: new Date().toISOString(),
        path: request.url,
        describe: exception.getErrorMessage(),
      });
      return;
    } else {
      response.status(status).json({
        code: status,
        timeStamp: new Date().toISOString(),
        path: request.url,
        describe: exception.message
      })
    }
  }
}
