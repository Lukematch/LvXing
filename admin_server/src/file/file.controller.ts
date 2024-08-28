import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multerConfig';


@Controller('/api/upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', multerConfig)
  )
  simple(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    return this.fileService.create(file);
  }
}
