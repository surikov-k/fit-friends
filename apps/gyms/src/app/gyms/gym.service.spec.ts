import { Test } from '@nestjs/testing';

import { GymInterface } from '@fit-friends/shared-types';
import { GymService } from './gym.service';
import { GymRepository } from './gym.repository';

describe('GymService', () => {
  let service: GymService;
  let fakeGymRepository: Partial<GymRepository>;
  const gym: GymInterface = {
    createdAt: undefined,
    description: 'Gym description',
    features: [],
    id: 1,
    isVerified: false,
    location: undefined,
    name: 'Gym name',
    photos: [],
    price: 0,
  };

  const gyms = [
    {
      ...gym,
      id: 1,
    },
    {
      ...gym,
      id: 2,
    },
  ];

  beforeEach(async () => {
    fakeGymRepository = {
      findById: (id: number) =>
        Promise.resolve(gyms.find((gym) => gym.id === id)),
      findAll: () => Promise.resolve(gyms),
      toggleFavorite: (id: number, userId: string) =>
        Promise.resolve({
          ...gym,
          id,
          favs: [userId],
        }),
      getFavorites: (userId: string) =>
        Promise.resolve([
          {
            ...gym,
            id: 1,
            favs: [userId],
          },
        ]),
    };

    const module = await Test.createTestingModule({
      providers: [
        GymService,
        {
          provide: GymRepository,
          useValue: fakeGymRepository,
        },
      ],
    }).compile();

    service = module.get(GymService);
  });

  it('can create an instance of gyms service', async () => {
    expect(service).toBeDefined();
  });

  it('gets a gym with an id', async () => {
    const gym = await service.get(1);
    expect(gym.id).toEqual(1);
  });

  it('gets all gyms', async () => {
    const gyms = await service.getAll();
    expect(gyms.length).toEqual(2);
  });

  it('adds a gym to users favorites', async () => {
    const gym = await service.toggleFavorite(1, 'userId');
    expect(gym.favs).toContain('userId');
  });

  it('removes a gym from users favorites', async () => {
    fakeGymRepository.toggleFavorite = (gymId: number, userId: string) =>
      Promise.resolve({
        ...gym,
        id: gymId,
        favs: [],
      });

    const result = await service.toggleFavorite(1, 'userId');
    expect(result.favs).not.toContain('userId');
  });

  it('gets favorite gyms of a user', async () => {
    const gyms = await service.getFavorites('userId');
    gyms.forEach((gym) => {
      expect(gym.favs).toContain('userId');
    });
  });
});
