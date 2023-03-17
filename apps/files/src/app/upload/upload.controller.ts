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

  private static parseAvatarPipeOptions = {
    validators: [
      new FileTypeValidator({ fileType: UploadFile.AVATAR_TYPE }),
      new MaxFileSizeValidator({ maxSize: UploadFile.AVATAR_MAX_SIZE }),
    ],
  };
}
