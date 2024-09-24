
import { Controller, Get, Delete, Param } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Log } from './entities/logger.entity';

@Controller('/api/logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  async getLogs(): Promise<Log[]> {
    return await this.loggerService.getAllLogs(); // 在 service 中实现
  }

  @Delete()
  async deleteAllLog(): Promise<{}> {
    return await this.loggerService.deleteAllLog(); // 在 service 中实现
  }

  @Delete(':id')
  async deleteLog(@Param('id') id: number): Promise<{}> {
    return await this.loggerService.deleteLog(id); // 在 service 中实现
  }
}
