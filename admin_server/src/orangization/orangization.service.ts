import { Injectable } from '@nestjs/common';
import { CreateOrangizationDto } from './dto/create-orangization.dto';
import { UpdateOrangizationDto } from './dto/update-orangization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orangization } from './entities/orangization.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class OrangizationService {
  constructor(
    @InjectRepository(Orangization)
    private readonly orangizationRepository: Repository<Orangization>,
  ) {}

  // 创建
  async create(createOrangizationDto: CreateOrangizationDto) {
    const { id } = createOrangizationDto
    const existAnnouncement = await this.orangizationRepository.findOne({
      where: { id }
    })
    if (existAnnouncement) {
      return {code: 401, message: '组织编号重复！'}
    }
    await this.orangizationRepository.save(createOrangizationDto)
    return {code: 200, message: '组织创建成功！'};
  }

  async findAll(query?: any) {
    const { name, code } = query;
    // console.log(query);
    const whereConditions: any = {};
    if (name) {
      whereConditions.name = Like(`%${name}%`);
    }
    if (code) {
      whereConditions.code = Like(`%${code}%`);
    }
    return await this.orangizationRepository.find({
      where: whereConditions
    });
  }

  // findOne(code: string) {
  //   return `This action returns a #${code} orangization`;
  // }

  // 更新公告
  async update(id: string, updateOrangizationDto: UpdateOrangizationDto) {
    // if(updateOrangizationDto?.id){
    //   return {code: 301, message: '组织编号不可更改！'};
    // }
    const existAnnouncement = await this.orangizationRepository.findOne({
      where: { id }
    })
    if (!existAnnouncement) {
      return {code: 401, message: '该组织不存在！'}
    }
    let update = {}
    // 去空值
    Object.keys(updateOrangizationDto).map((key)=> {
      let value = updateOrangizationDto[key];
      if(value !== null && value !== undefined && value !== '') update[key] = value
    })
    // console.log(update);
    await this.orangizationRepository.update(id, update)
    return {code: 200, message: '组织信息更新成功！'};
  }

  // 删除公告
  async remove(id: string) {
    const existAnnouncement = await this.orangizationRepository.findOne({
      where: { id }
    })
    if (!existAnnouncement) {
      return {code: 401, message: '该组织不存在！'}
    }
    await this.orangizationRepository.delete(id)
    return {code: 200, message: '组织删除成功！'}
  }
}
