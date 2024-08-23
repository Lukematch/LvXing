import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnnouncementService {

  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
  ) {}

  // 新增公告
  async create(createAnnouncementDto: CreateAnnouncementDto) {
    const { id } = createAnnouncementDto
    const existAnnouncement = await this.announcementRepository.findOne({
      where: { id }
    })
    if (existAnnouncement) {
      return {code: 401, message: '公告编号重复！'}
    }
    await this.announcementRepository.save(createAnnouncementDto)
    return {code: 200, message: '公告创建成功！'};
  }

  // 查询公告
  findAll() {
    return this.announcementRepository.find();
  }

  // 查询单个公告
  findOne(id: number) {
    return this.announcementRepository.findOne({
      where: { id }
    });
  }

  // 更新公告
  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    if(updateAnnouncementDto?.id){
      return {code: 301, message: 'id不可更改！'};
    }
    const existAnnouncement = await this.announcementRepository.findOne({
      where: { id }
    })
    if (!existAnnouncement) {
      return {code: 401, message: '该公告不存在！'}
    }
    let update = {}
    Object.keys(updateAnnouncementDto).map((key)=> {
      let value = updateAnnouncementDto[key];
      if(value !== null && value !== undefined && value !== '') update[key] = value
    })
    // console.log(update);
    await this.announcementRepository.update(id, update)
    return {code: 200, message: '公告更新成功！'};
  }

  // 删除公告
  async remove(id: number) {
    const existAnnouncement = await this.announcementRepository.findOne({
      where: { id }
    })
    if (!existAnnouncement) {
      return {code: 401, message: '该公告不存在！'}
    }
    await this.announcementRepository.delete(id)
    return {code: 200, message: '公告删除成功！'}
  }
}
