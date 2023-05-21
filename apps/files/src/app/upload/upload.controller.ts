import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploadService } from './upload.service';
import { UploadFile } from './upload.constants';
import { fillObject } from '@fit-friends/core';
import { SaveFileRdo } from './rdo';

@Controller('upload')
export class UploadController {
  private static parseAvatarPipeOptions = {
    validators: [
      new FileTypeValidator({ fileType: UploadFile.AVATAR_TYPE }),
      new MaxFileSizeValidator({ maxSize: UploadFile.AVATAR_MAX_SIZE }),
    ],
  };
  private static parseCertificatePipeOptions = {
    validators: [
      new FileTypeValidator({ fileType: UploadFile.CERTIFICATE_TYPE }),
      new MaxFileSizeValidator({ maxSize: UploadFile.CERTIFICATE_MAX_SIZE }),
    ],
  };

  private static parseVideoPipeOptions = {
    validators: [
      new FileTypeValidator({ fileType: UploadFile.VIDEO_TYPE }),
      new MaxFileSizeValidator({ maxSize: UploadFile.VIDEO_MAX_SIZE }),
    ],
  };

  constructor(private readonly uploadService: UploadService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async saveAvatarFile(
    @UploadedFile(new ParseFilePipe(UploadController.parseAvatarPipeOptions))
    { filename }: Express.Multer.File
  ) {
    const file = await this.uploadService.save({ filename });
    return fillObject(SaveFileRdo, file);
  }

  @Post('certificate')
  @UseInterceptors(FileInterceptor('certificate'))
  public async saveCertificateFile(
    @UploadedFile(
      new ParseFilePipe(UploadController.parseCertificatePipeOptions)
    )
    { filename }: Express.Multer.File
  ) {
    const file = await this.uploadService.save({ filename });
    return fillObject(SaveFileRdo, file);
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('videofile'))
  public async saveVideoFile(
    @UploadedFile(new ParseFilePipe(UploadController.parseVideoPipeOptions))
    { filename }: Express.Multer.File
  ) {
    const file = await this.uploadService.save({ filename });
    return fillObject(SaveFileRdo, file);
  }
}
