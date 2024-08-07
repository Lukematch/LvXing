import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  // 新增用户
  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto
    const existUser = await this.userRepository.findOne({
      where: { username }
    })
    if(existUser) {
      throw new ApiException('已经存在该用户！', ApiErrorCode.USER_ID_INVALID)
    }
    try {
      const newUser = await this.userRepository.create(createUserDto)
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
    if(!user) throw new ApiException('用户不存在！',ApiErrorCode.USER_NOTEXIST)
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
