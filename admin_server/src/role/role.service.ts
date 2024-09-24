import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(body:{params: UpdateRoleDto, id?: number}) {
    const { params: roleDto, id } = body;
    //查询传入数组permissionIds的全部permission实体
    // 数组 使用In关键字
    // const permissions = await this.permissionRepository.find({
    //   where: {
    //     id: In(roleDto?.permissionIds),
    //   },
    // });
    if(!id) {
      const existRole = await this.roleRepository.findOne({
        where: { name: roleDto?.name },
      });
      if (existRole)
        return {code: 400, message:'角色已存在', success: false}
      this.roleRepository.save(roleDto);
      return {code: 200, message:'角色创建成功', success: true}
    } else {
      let update: any = {}
      // 去空值
      Object.keys(roleDto).map((key)=> {
        let value = roleDto[key];
        if(value !== null && value !== undefined && value !== '') update[key] = value
      })
      this.roleRepository.update(id, roleDto);
      return {code: 200, message:'角色更新成功', success: true}
    }

  }

  findAll() {
    return this.roleRepository.find();
  }

  async remove(id: number) {
    const existRole= await this.roleRepository.findOne({
      where: { id }
    })
    if (!existRole) {
      return {code: 404, success: false, message: '该角色不存在！'}
    } else if ([1, 2, 3].includes(id)) {
      return {code: 301, success: false, message: '不可擅自删除该默认角色！'}
    }
    await this.roleRepository.delete(id)
    return {code: 200, success: true, message: '角色删除成功！'}
  }
}
