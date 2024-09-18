import { Injectable } from '@nestjs/common';
import { CreateHobbyDto } from './dto/create-hobby.dto';
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
  update(createHobbyDto: CreateHobbyDto) {
    return 'This action adds a new hobby';
  }

  // findAll() {
  //   return `This action returns all hobby`;
  // }

  findByUser(username: string) {
    const existUser = this.hobbyRepository.find({
      where: {
        username,
      }
    });
    if (!existUser) {
      return {code: 404, success: false, message: '用户不存在'}
    }
    return existUser
  }

  // update(id: number, updateHobbyDto: UpdateHobbyDto) {
  //   return `This action updates a #${id} hobby`;
  // }

  remove(id: number) {
    return `This action removes a #${id} hobby`;
  }
}
