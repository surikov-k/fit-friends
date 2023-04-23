import { Injectable } from '@nestjs/common';

import { CrudRepositoryInterface } from '@fit-friends/core';
import { UserEntity } from './user.entity';
import { UserInterface } from '@fit-friends/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository
  implements CrudRepositoryInterface<UserEntity, string, UserInterface>
{
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) { }

  public async create(entity: UserEntity): Promise<UserInterface> {
    const user = new this.userModel(entity);
    return user.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async update(id: string, entity: UserEntity): Promise<UserInterface> {
    return this.userModel
      .findByIdAndUpdate(id, entity.toObject(), { new: true })
      .exec();
  }

  public async findAll(): Promise<UserInterface[] | null> {
    return this.userModel.find().exec();
  }

  public async findMany(ids): Promise<UserInterface[]> {
    return this.userModel
      .find({
        _id: { $in: ids },
      })
      .exec();
  }

  public async upsert(entity: UserEntity) {
    return this.userModel.findOneAndUpdate({ _id: entity._id }, entity, { upsert: true, new: true })
  }
}
