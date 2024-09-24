import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { MenuService } from './menu.service';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('/api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  update(@Body() body: {menu: UpdateMenuDto, id?: number}) {
    return this.menuService.update(body);
  }

  // 获取菜单列表
  @Post('/user')
  findAll(@Body() user: any) {
    return this.menuService.findAll(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.menuService.remove(id);
  }
}
