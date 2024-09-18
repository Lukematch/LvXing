import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';

@Controller('/api/hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Post()
  update(@Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbyService.update(createHobbyDto);
  }

  // 查询该用户的所有爱好
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.hobbyService.findByUser(username);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hobbyService.remove(+id);
  }
}
