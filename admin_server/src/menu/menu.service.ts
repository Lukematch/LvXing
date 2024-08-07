import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { convertToTree } from 'src/utils/convertToTree';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menu: Repository<Menu>,
    @InjectRepository(Menu)
    private readonly userRepository: Repository<User>
  ) {}

  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  async findAll(user) {
    const userList: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where({ username: user.username })
      .orderBy('menu.orderNum', 'ASC')
      .getOne();

    interface MenuMap {
      [key: string]: Menu;
    }

    // const menus: MenuMap = userList?.roles.reduce(
    //   (mergedMenus: MenuMap, role: any) => {
    //     role.menus.forEach((menu: Menu) => {
    //       mergedMenus[menu.id] = menu;
    //     });
    //     return mergedMenus;
    //   },
    //   {},
    // );

    // 去重后的菜单数组
    // const uniqueMenus: Menu[] = Object.values(menus);

    // return convertToTree(uniqueMenus);
    // return this.menu.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
