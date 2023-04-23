import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { AlertInterface } from '@fit-friends/shared-types';
import { AlertEntity } from './alert.entity';
import { AlertModel } from './alert.model';

export class AlertRepository
  implements CrudRepositoryInterface<AlertEntity, string, AlertInterface>
{
  constructor(
    @InjectModel(AlertModel.name) private readonly alertModel: Model<AlertModel>
  ) { }

  public async create(entity: AlertEntity): Promise<AlertInterface> {
    const alert = new this.alertModel(entity);
    return alert.save();
  }

  public async destroy(id: string): Promise<unknown> {
    return this.alertModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<AlertInterface | null> {
    return this.alertModel.findOne({ id }).exec();
  }

  public async findByRecipient(recipientId): Promise<AlertInterface[]> {
    return this.alertModel.find({ recipientId }).exec();
  }

  public async update(id: string, item: AlertEntity): Promise<AlertInterface> {
    return Promise.resolve(undefined);
  }
}
