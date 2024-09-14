import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto } from './dto/create-hobby.dto';
import { UpdateHobbyDto } from './dto/update-hobby.dto';

@Controller('/api/hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Post()
  create(@Body() createHobbyDto: CreateHobbyDto) {
    return this.hobbyService.create(createHobbyDto);
  }

  @Get()
  findAll() {
    return this.hobbyService.findAll();
  }

  // 查询该用户的所有爱好
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.hobbyService.findByUser(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHobbyDto: UpdateHobbyDto) {
    return this.hobbyService.update(+id, updateHobbyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hobbyService.remove(+id);
  }
}
