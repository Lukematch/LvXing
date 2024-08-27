import { PartialType } from '@nestjs/mapped-types';
import { CreateOrangizationDto } from './create-orangization.dto';

export class UpdateOrangizationDto extends PartialType(CreateOrangizationDto) {}
