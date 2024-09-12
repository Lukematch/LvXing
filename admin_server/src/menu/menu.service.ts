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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
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
            menuType: 'guest' || 'user',
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
