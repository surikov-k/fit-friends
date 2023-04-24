import { Test } from '@nestjs/testing';

import { FileInterface } from '@fit-friends/shared-types';
import { UploadRepository } from './upload.repository';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;
  let fakeUploadRepository: Partial<UploadRepository>;
  const file: FileInterface = {
    filename: 'upload.jpg',
  };

  beforeEach(async () => {
    fakeUploadRepository = {
      create: (entity) => Promise.resolve(entity),
    };
    const module = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: UploadRepository,
          useValue: fakeUploadRepository,
        },
      ],
    }).compile();
    service = module.get(UploadService);
  });

  it('can create an instance of upload service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new upload record', async () => {
    const upload = await service.save(file);
    expect(upload.filename).toEqual('upload.jpg');
  });
});
