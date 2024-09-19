import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { UpdateHobbyDto } from './dto/update-hobby.dto';

@Controller('/api/hobby')
export class HobbyController {
  constructor(private readonly hobbyService: HobbyService) {}

  @Post()
  update(@Body() body: {params: UpdateHobbyDto, id?: number}) {
    return this.hobbyService.update(body);
  }

  // 查询该用户的所有爱好
  @Get(':username')
  findOne(
    @Param('username') username: string,
    @Query('page') page,
    @Query('pageSize') pageSize
  ) {
    return this.hobbyService.findByUser(username, Number(page), Number(pageSize));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hobbyService.remove(id);
  }
}
