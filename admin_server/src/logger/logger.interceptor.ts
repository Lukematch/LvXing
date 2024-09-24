import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    return next
      .handle()
      .pipe(
        tap(() => {
          const message = `Request: ${method} ${url}`;
          this.loggerService.logInfo(message); // 自动记录日志
        }),
      );
  }
}
