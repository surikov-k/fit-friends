import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { FileInterface } from '@fit-friends/shared-types';

@Schema({
  collection: 'files',
  timestamps: true,
})
export class UploadModel extends Document implements FileInterface {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  uploaderId: string;
}

export const UploadSchema = SchemaFactory.createForClass(UploadModel);
