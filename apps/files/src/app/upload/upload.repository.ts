import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { FileInterface } from '@fit-friends/shared-types';
import { UploadEntity } from './upload.entity';
import { UploadModel } from './upload.model';

@Injectable()
export class UploadRepository
  implements CrudRepositoryInterface<UploadEntity, string, FileInterface>
{
  constructor(
    @InjectModel(UploadModel.name)
    private readonly uploadModel: Model<UploadModel>
  ) {}

  public async create(item: UploadEntity): Promise<FileInterface> {
    const upload = new this.uploadModel(item);
    return upload.save();
  }

  public async destroy(id: string): Promise<void> {
    await this.uploadModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<FileInterface | null> {
    return this.uploadModel.findOne({ id }).exec();
  }

  public async findByName(name: string): Promise<FileInterface | null> {
    return this.uploadModel.findOne({ filename: name }).exec();
  }

  public async update(id: string, item: UploadEntity): Promise<FileInterface> {
    return Promise.resolve(undefined);
  }
}
