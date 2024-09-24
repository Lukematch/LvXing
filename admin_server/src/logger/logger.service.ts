import * as log4js from 'log4js';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/logger.entity';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;
  private readonly maxLogs = 100; // 设置最大日志条数
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }


  async log(level: string, message: string) {
    const logEntry = this.logRepository.create({
      message,
      level,
      timestamp: new Date(),
    });
    await this.logRepository.save(logEntry);
    // 记录到控制台和文件
    // this.logger.log(level, message);
    // 检查并清除多余的日志
    await this.cleanupLogs();
  }

  logInfo(message: string) {
    return this.log('info', message);
  }

  logError(message: string) {
    return this.log('error', message);
  }

  private async cleanupLogs() {
    const count = await this.logRepository.count();
    if (count > this.maxLogs) {
      // const excessLogs = count - this.maxLogs;
      // // 删除最旧的日志
      // const logsToDelete = await this.logRepository.find({
      //   order: { timestamp: 'ASC' },
      //   take: excessLogs,
      // });
      // await this.logRepository.remove(logsToDelete);

      // 清空表，保留当前插入的日志
      await this.logRepository.clear();
    }
  }

  async getAllLogs(): Promise<Log[]> {
    return await this.logRepository.find();
  }

  async deleteLog(id: number): Promise<{}> {
    await this.logRepository.delete(id);
    return {code:200, message:'删除成功',success: true};
  }

  async deleteAllLog(): Promise<{}> {
    await this.logRepository.clear();
    return {code:200, message:'删除成功',success: true};
  }

}
