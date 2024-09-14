import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  update(@Body() body: {params: UpdateUserDto, id?: number}) {
    return this.userService.update(body);
  }

  @Post('/rpw')
  resetPw(@Body() body: {pw: string, id: number}) {
    return this.userService.resetPw(body);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findByUser(username);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
