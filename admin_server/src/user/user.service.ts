import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Like, Repository } from 'typeorm';
import encry from '../utils/crypto';

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

  async resetPw(body:{pw: string, id: number}) {
    const { pw, id } = body
    const existUser = await this.userRepository.findOne({
      where: { id }
    })
    if(!existUser) {
      return {code: 401, success: false, message: '不存在该用户！'}
    }
    existUser.password = encry(pw, existUser.salt)
    await this.userRepository.save(existUser)
    return {code: 200, success: true, message: '密码重置成功！'}
  }

  // 更新用户
  async update(body: {params: UpdateUserDto, id?: number}) {
    // console.log(body);
    const { params, id } = body
    const { username, role } = params
    try {
      const oneRole = await this.roleRepository.findOne({
        where: {
          code: role,
        },
      })
      const existUser = await this.userRepository.findOne({
        where: { username }
      })
      if(!id && existUser) {
        return {code: 401,success: false, message: '已存在该用户名！'}
      }
      if(!oneRole) {
        return {code:401,success: false, message: '不存在角色！'}
      }
      // console.log(id);
      // 不存在当前用户 注册用户
      if(!id) {
        const newUser = await this.userRepository.create(params)
        await this.userRepository.save(newUser)
        return {code: 200, success: true, message: '用户注册成功！'}
      } else {
        const existUserId = await this.userRepository.findOne({
          where: { id }
        })
        // 存在当前用户 更新用户信息
        if(existUserId){
          let update: any = {}
          // 去空值
          Object.keys(params).map((key)=> {
            let value = params[key];
            if(value !== null && value !== undefined && value !== '') update[key] = value
          })
          // console.log(update);
          if(update.role && existUserId.role !== update.role && (existUserId?.username === 'lv0001' || existUserId?.username === 'lv0002')) {
            return {code: 401, success: false, message: '无权限修改该用户角色！'}
          }
          await this.userRepository.update(id, update)
          return {code: 200, success: true, message: '用户信息更新成功'};
        // 不存在当前用户
        } else {
          return {code: 404,success: false, message: '不存在该用户！'}
        }
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  // 查询所有用户
  async findAll(query: any) {
    const { username, nickName, role } = query;
    // console.log(query);
    const whereConditions: any = {};
    if (username) {
      whereConditions.username = Like(`%${username}%`);
    }
    if (nickName) {
      whereConditions.nickName = Like(`%${nickName}%`);
    }
    if (role) {
      whereConditions.role = role;
    }
    return await this.userRepository.find({
      where: whereConditions
    });
  }

  // 查询单个用户
  async findByUser(username: string) {
    const user = await this.userRepository.findOne({
      where: { username }
    })
    if(!user) return null
    return user;
  }

  async remove(id: number) {
    const existUser = await this.userRepository.findOne({
      where: { id }
    })
    if (!existUser) {
      return {code: 401, message: '该用户不存在！'}
    } else if (existUser?.username === 'lv0001' || existUser?.username === 'lv0002') {
      return {code: 301, message: '不可删除该内测用户！'}
    }
    await this.userRepository.delete(id)
    return {code: 200, message: '用户删除成功！'}
  }
}
