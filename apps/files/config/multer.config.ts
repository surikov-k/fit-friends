import { ConfigService, registerAs } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const multerEnvOptions = registerAs('uploads', () => ({
  path: process.env.UPLOADS_DIR,
}));

export function getMulterConfig(configService: ConfigService): MulterOptions {
  return {
    storage: diskStorage({
      destination: configService.get<string>('uploads.path'),
      filename: (req, file, cb) => {
        const filename = `${Date.now()}.${file.originalname}`;
        cb(null, filename);
      },
    }),
  };
}
