import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/logger.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './logger.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Log])], // 导入实体
  controllers: [LoggerController],
  providers: [LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },],

})
export class LoggerModule {}
