import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('/api/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // 新增角色
  @Post()
  create(@Body() body:{params: UpdateRoleDto, id?: number}) {
    return this.roleService.create(body);
  }

  // 获取所有角色
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
