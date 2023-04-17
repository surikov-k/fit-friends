import { CrudRepositoryInterface } from '@fit-friends/core';
import { MailEntity } from './mail.entity';
import { MailInterface, MailStatus } from '@fit-friends/shared-types';
import { MailModel } from './mail.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class MailRepository
  implements CrudRepositoryInterface<MailEntity, string, MailInterface>
{
  constructor(
    @InjectModel(MailModel.name) private readonly mailModel: Model<MailModel>
  ) {}

  public async create(entity: MailEntity): Promise<MailInterface> {
    const mail = new this.mailModel(entity);
    return mail.save();
  }

  public async destroy(id: string): Promise<void> {
    this.mailModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<MailInterface | null> {
    return this.mailModel.findOne({ id }).exec();
  }

  public findPending(): Promise<MailInterface[]> {
    return this.mailModel.find({ status: MailStatus.Pending }).exec();
  }

  public async update(id: string, entity: MailEntity): Promise<MailInterface> {
    return this.mailModel
      .findByIdAndUpdate(id, entity.toObject(), {
        new: true,
      })
      .exec();
  }
}
