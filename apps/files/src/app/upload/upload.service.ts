import { Injectable } from '@nestjs/common';
import { UploadRepository } from './upload.repository';

import { UploadEntity } from './upload.entity';
import { SaveUploadDto } from './dto';

@Injectable()
export class UploadService {
  constructor(private readonly uploadRepository: UploadRepository) {}

  public async save(upload: SaveUploadDto) {
    return this.uploadRepository.create(
      new UploadEntity({ ...upload, uploaderId: 'uploader' })
    );
  }
}
