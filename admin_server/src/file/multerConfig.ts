import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  // 限制一张照片大小为10MB
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: (_req, file: Express.Multer.File, cb) => {
    // 限制上传图片类型文件
    if (file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
      return cb(null, true);
    }
    return cb(null, false);
  },
  storage: diskStorage({
    destination: './upload/image',
    filename: (_req, file, cb) => {
      // 生成一个随机字符串
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      // 设置文件名
      // return cb(null, `${randomName}${file.originalname}`);
      // 获取文件后缀 隐藏真实名称
      const suffix = extname(file.originalname);
      return cb(null, `${randomName}${suffix}`);
    }
  })
}