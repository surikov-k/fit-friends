import { Test } from '@nestjs/testing';

import { AlertService } from './alert.service';
import { AlertRepository } from './alert.repository';
import { AlertInterface } from '@fit-friends/shared-types';

describe('AlertService', () => {
  let service: AlertService;
  let fakeAlertRepository: Partial<AlertRepository>
  const alert: AlertInterface = {
    recipientId: 'recipientId',
    text: 'Alert text'
  }

  beforeEach(async () => {
    fakeAlertRepository = {
      create: (entity) => Promise.resolve(entity),
      destroy: (id: string) => Promise.resolve({ acknowledged: true, deletedCount: 1 }),
      findById: () => Promise.resolve(alert),
      findByRecipient: () => Promise.resolve([alert]),
    }
    const module = await Test.createTestingModule({
      providers: [
        AlertService,
        {
          provide: AlertRepository,
          useValue: fakeAlertRepository,
        }
      ]
    }).compile();

    service = module.get(AlertService)
  })

  it('can create an instance of alert service', async () => {
    expect(service).toBeDefined();
  });

  it('gets alerts for the user with id', async () => {
    const alerts = await service.getByRecipient('recipinetId');

    alerts.forEach((alert) => {
      expect(alert.recipientId).toEqual('recipientId')
    })
  })

  it('deletes an alert with an id', async () => {
    const result = await service.delete('alertId');
    expect(result.deletedCount).toEqual(1);
  })
});
