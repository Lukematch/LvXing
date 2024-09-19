import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateHobbyDto } from './dto/update-hobby.dto';
import { Hobby } from './entities/hobby.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HobbyService {
  constructor(
    @InjectRepository(Hobby)
    private readonly hobbyRepository: Repository<Hobby>,
  ) {}

  // 更新兴趣爱好
  async update(body: {params: UpdateHobbyDto, id?: number}) {
    const { params, id } = body
    const { username, hobbyName, hobbyDescription, hobbyIcon } = params
    if (!username || !hobbyName) {
      return {code: 400, success: false, message: "缺少必要的参数"};
    }
    try {
      if(!id) {
        // 不存在id，新增
        // console.log(username, hobbyName);
        const existHobby = await this.hobbyRepository.find({
          where: {
            username,
            hobbyName
          }
        })
        if (existHobby.length > 0) {
          return {code: 401, success: false, message: '当前兴趣爱好重名！'}
        }
        const hobby = this.hobbyRepository.create({
          username,
          hobbyName,
          hobbyDescription,
          hobbyIcon,
        })
        this.hobbyRepository.save(hobby)
        return {code: 200, success: true, message: '兴趣爱好更新成功！'}
      } else {
        const existHobbyId = await this.hobbyRepository.findOne({
          where: { id }
        })
        if(existHobbyId){
          // 存在id，更新
          let update: any = {}
          // 去空值
          Object.keys(params).map((key)=> {
            let value = params[key];
            if(value !== null && value !== undefined && value !== '') update[key] = value
          })
          if(existHobbyId?.hobbyName !== params?.hobbyName) {
            return {code: 400, success: false, message: '兴趣爱好名称不允许修改！'}
          }
          await this.hobbyRepository.update(id, update)
          return {code: 200, success: true, message: '兴趣爱好更新成功！'};
        // 不存在当前用户
        } else {
          return {code: 404,success: false, message: '不存在该兴趣爱好！'}
        }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async findByUser(username: string, page?: number, pageSize?: number) {
    const existUser = await this.hobbyRepository.find({
      where: {
        username,
      }
    });
    if (!existUser) {
      return {code: 404, success: false, message: '用户不存在兴趣爱好！'}
    }
    const [result, total] = await this.hobbyRepository.findAndCount({
      where: { username },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: result,
      total, // 返回兴趣爱好的总数
    };
  }


  async remove(id: number) {
    const existHobby = await this.hobbyRepository.findOne({
      where: { id }
    })
    if (!existHobby) {
      return {code: 404, success: false, message: '该兴趣爱好不存在！'}
    } else if (existHobby?.username === 'lv0001' || existHobby?.username === 'lv0002') {
      return {code: 301, success: false, message: '不可删除该内测用户兴趣爱好！'}
    }
    await this.hobbyRepository.delete(id)
    return {code: 200, success: true, message: '用户兴趣爱好删除成功！'}
  }
}
