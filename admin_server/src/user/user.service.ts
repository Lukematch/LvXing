import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ){}

  // 新增用户
  async create(createUserDto: CreateUserDto) {
    const { username, password, roleId } = createUserDto
    const existUser = await this.userRepository.findOne({
      where: { username }
    })
    if(existUser) {
      return {code: 401, message: '用户已存在！'}
    }
    try {
       //查询数组roleIds对应所有role的实例
      const role = await this.roleRepository.findOne({
        where: {
          id: roleId,
        },
      });
      const newUser = await this.userRepository.create({
        ...createUserDto,
        username,
        password,
        role: role.name === '超级管理员'? 'root' : role.name === '普通用户'? 'user' : 'guest',
      })
      await this.userRepository.save(newUser)
      return {success: true, message: '用户注册成功！'}
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  // 查询所有用户
  findAll() {
    // throw new ApiException('禁止访问！', ApiErrorCode.NOFOUND)
    return this.userRepository.find();
  }

  // 查询单个用户
  async findByUser(username: string) {
    const user = await this.userRepository.findOne({
      where: { username }
    })
    if(!user) return null
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
