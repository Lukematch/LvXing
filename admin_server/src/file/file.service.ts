import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  create(file: Express.Multer.File) {
    if (!file) {
      return {
        code: 400,
        message: '请上传正确的文件！'
      };
    }
    return {
      url: `http://localhost:3000/assets/${file.filename}`,
      name: file.originalname,
    }
  }
}
