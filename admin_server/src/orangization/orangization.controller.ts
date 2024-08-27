import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrangizationService } from './orangization.service';
import { CreateOrangizationDto } from './dto/create-orangization.dto';
import { UpdateOrangizationDto } from './dto/update-orangization.dto';

@Controller('/api/orangization')
export class OrangizationController {
  constructor(private readonly orangizationService: OrangizationService) {}

  @Post()
  create(@Body() createOrangizationDto: CreateOrangizationDto) {
    return this.orangizationService.create(createOrangizationDto);
  }

  @Get()
  findAll() {
    return this.orangizationService.findAll();
  }

  // @Get(':code')
  // findOne(@Param('code') id: string) {
  //   return this.orangizationService.findOne(id);
  // }

  @Patch(':code')
  update(@Param('code') id: string, @Body() updateOrangizationDto: UpdateOrangizationDto) {
    return this.orangizationService.update(id, updateOrangizationDto);
  }

  @Delete(':code')
  remove(@Param('code') id: string) {
    return this.orangizationService.remove(id);
  }
}
