import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Like, Repository } from 'typeorm';
import { createHash } from 'crypto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  // 创建
  async create(createPositionDto: CreatePositionDto) {
    const { name } = createPositionDto
    const existAnnouncement = await this.positionRepository.findOne({
      where: { name }
    })
    if (existAnnouncement) {
      return {code: 401, message: '岗位名称重复！'}
    }
    // 使用 SHA-256 哈希生成唯一 ID
    const hash = createHash('sha256');
    hash.update(name);
    // 将哈希值转为 UUID 格式字符串
    createPositionDto.id = hash.digest('hex').substring(0, 18);
    await this.positionRepository.save(createPositionDto)
    return {code: 200, message: '岗位创建成功！'};
  }

  // 查询
  async findAll(query?: any) {
    const { name, affiliated_org, id } = query;
    const whereConditions: any = {};
    if (name) {
      whereConditions.name = Like(`%${name}%`);
    }
    if (affiliated_org) {
      whereConditions.affiliated_org = Like(`%${affiliated_org}%`);
    }
    if(id){
      whereConditions.id = id;
    }
    return await this.positionRepository.find({
      where: whereConditions
    });
  }

  // 更新岗位信息
  async update(id: string, updatePositionDto: UpdatePositionDto) {
    const existAnnouncement = await this.positionRepository.findOne({
      where: { id }
    })
    if (!existAnnouncement) {
      return {code: 401, message: '该岗位不存在！'}
    }
    let update = {}
    // 去空值
    Object.keys(updatePositionDto).map((key)=> {
      let value = updatePositionDto[key];
      if(value !== null && value !== undefined && value !== '') update[key] = value
    })
    // console.log(update);
    await this.positionRepository.update(id, update)
    return {code: 200, message: '岗位信息更新成功！'};
  }

  // 删除岗位
  async remove(id: string) {
    const existAnnouncement = await this.positionRepository.findOne({
      where: { id }
    })
    if (!existAnnouncement) {
      return {code: 401, message: '该岗位不存在！'}
    }
    await this.positionRepository.delete(id)
    return {code: 200, message: '岗位删除成功！'}
  }
}
