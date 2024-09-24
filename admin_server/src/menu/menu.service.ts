import { Injectable } from '@nestjs/common';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { convertToTree } from 'src/utils/convertToTree';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menu: Repository<Menu>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async update(body: {menu: UpdateMenuDto, id?: number}) {
    const { menu, id } = body
    const { menuName, parentId, path, component, icon } = menu

    if(parentId){
      const existParentId = await this.menu.findOne({
        where: {
          id: parentId
        }
      })
      if(!existParentId) {
        return { code: 400, success: false, message: '不存在该父级菜单' }
      }
    }
    const existMenuName = await this.menu.findOne({ where: { menuName }})
    const existMenuPath = await this.menu.findOne({ where: { path }})
    const existMenuComponent = await this.menu.findOne({ where: { component } })
    const existMenuIcon = await this.menu.findOne({ where: { icon } })

    if(!id && existMenuName) {
      return { code: 400, success: false, message: '菜单名称已存在' }
    }
    if(!id && existMenuPath) {
      return { code: 400, success: false, message: '菜单路由已存在' }
    }
    if(!id && existMenuComponent) {
      return { code: 400, success: false, message: '组件路径已存在' }
    }
    if(!id && existMenuIcon) {
      return { code: 400, success: false, message: '菜单图标已使用，无法重复使用' }
    }
    if(!id) {
      const newMenu = await this.menu.create(menu)
      await this.menu.save(newMenu)
      return {code: 200, success: true, message: '新菜单创建成功！'}
    } else {
      const existMenuId = await this.menu.findOne({
        where: { id }
      })
      if(existMenuId){
        let update: any = {}
        // 去空值
        Object.keys(menu).map((key)=> {
          let value = menu[key];
          if(value !== null && value !== undefined && value !== '') update[key] = value
        })
        const existMenuName = await this.menu.findOne({ where: { menuName, id: Not(id) } })
        const existMenuPath = await this.menu.findOne({ where: { path, id: Not(id) } })
        const existMenuComponent = await this.menu.findOne({ where: { component, id: Not(id) } })
        const existMenuIcon = await this.menu.findOne({ where: { icon, id: Not(id) } })

        if(existMenuId.id in [1,4,9,13]) {
          return {code: 401, success: false, message: '无法修改该菜单'}
        }
        if(update?.icon && existMenuIcon) {
          return {code: 400, success: false, message: '菜单图标已使用，无法重复使用'}
        }
        if(update?.menuName && existMenuName) {
          return {code: 400, success: false, message: '菜单名称已重复'}
        }
        if(update?.component && existMenuPath) {
          return {code: 400, success: false, message: '菜单路由已重复'}
        }
        if(update?.icon && existMenuComponent) {
          return {code: 400, success: false, message: '组件路径已经重复'}
        }
        await this.menu.update(id, update)
        return {code: 200, success: true, message: '菜单信息更新成功'};
      // 不存在当前用户
      } else {
        return {code: 404,success: false, message: '不存在该菜单！'}
      }
    }
  }

  async findAll(user: any) {
    const theUser: User = await this.userRepository.findOne({
      where: {
        username: user.username
      }
    })
    switch (theUser.role) {
      case 'root':
        return this.menu.find();
      case 'user':
        return this.menu.find({
          where: {
            menuType: In(['guest', 'user'])
          }
        });
      case 'guest':
        return this.menu.find({
          where: {
            menuType: 'guest',
          }
        });
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} menu`;
  // }

  // update(id: number, updateMenuDto: UpdateMenuDto) {
  //   return `This action updates a #${id} menu`;
  // }

  async remove(id: number) {
    const existMenu= await this.menu.findOne({
      where: { id }
    })
    if (!existMenu) {
      return {code: 404, success: false, message: '该菜单不存在！'}
    } else if ( [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].includes(existMenu.id)) {
      return {code: 301, success: false, message: '不可擅自删除该默认菜单！'}
    }
    await this.userRepository.delete(id)
    return {code: 200, success: true, message: '菜单删除成功！'}
  }
}
