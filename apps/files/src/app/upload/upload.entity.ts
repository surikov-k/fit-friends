import { FileInterface } from '@fit-friends/shared-types';
import { EntityInterface } from '@fit-friends/core';

export class UploadEntity
  implements FileInterface, EntityInterface<FileInterface>
{
  _id: string;
  filename: string;
  uploaderId: string;

  constructor(file: FileInterface) {
    this.fillEntity(file);
  }

  fillEntity(file: FileInterface): void {
    this._id = file._id;
    this.filename = file.filename;
    this.uploaderId = file.uploaderId;
  }

  toObject(): FileInterface {
    return { ...this };
  }
}
