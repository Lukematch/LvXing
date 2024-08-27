import { Module } from '@nestjs/common';
import { OrangizationService } from './orangization.service';
import { OrangizationController } from './orangization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orangization } from './entities/orangization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orangization])],
  controllers: [OrangizationController],
  providers: [OrangizationService],
})
export class OrangizationModule {}
