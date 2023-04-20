import { Test } from '@nestjs/testing';

import {
  ClientInterface,
  CoachInterface,
  Skill,
  UserInterface,
} from '@fit-friends/shared-types';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { RpcException } from '@nestjs/microservices';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const user = {
      _id: 'userId',
      passwordHash:
        '$2b$10$GvGg7VNY.NQ1D.T4w.6XDOIoFydEekHHxs8JtL/K4f6gWFRsoNYxK',
      refreshTokenHash:
        '$2b$10$J1uQ8PWW2L3aVTHopDBw0.LL/HFrjm0hmbx/mvpQVcHv5J6djfRt2',
      friends: ['userId'],
    } as unknown as UserInterface;

    const fakeUserRepository: Partial<UserRepository> = {
      create: (entity: UserEntity) =>
        Promise.resolve({ _id: 'userId', ...entity }),
      destroy: () => Promise.resolve(),
      findById: (id: string) => Promise.resolve(id === user._id ? user : null),
      findByEmail: (email: string) => Promise.resolve({ ...user, email }),
      findAll: () => Promise.resolve([user]),
      findMany: ([id1, id2]) =>
        Promise.resolve([
          { ...user, _id: id1 },
          { ...user, _id: id2 },
        ]),
      update: (id: string, entity: UserEntity): Promise<UserInterface> =>
        Promise.resolve({ ...user, ...entity, _id: id }),
    };

    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: fakeUserRepository,
        },
      ],
    }).compile();

    service = module.get(UserService);
  });

  it('can create an instance of user service', async () => {
    expect(service).toBeDefined();
  });

  it('gets a user by id', async () => {
    const user = await service.get('userId');
    expect(user._id).toEqual('userId');
  });

  it('throws if the user was not found', async () => {
    try {
      await service.get('unknownId');
    } catch (error) {
      expect(error).toBeInstanceOf(RpcException);
    }
  });

  it('gets all users', async () => {
    const users = await service.getAll();
    expect(users.length).toEqual(1);
  });

  it('saves client details', async () => {
    const user = await service.saveClientDetails('userId', {
      caloriesPerDay: 500,
      caloriesTarget: 0,
      duration: undefined,
      info: '',
      readiness: false,
    } as ClientInterface);

    expect(user._id).toEqual('userId');
  });

  it('saves coach details', async () => {
    const user = await service.saveCoachDetails('userId', {
      achievements: '',
      certificate: '',
      hasPersonalTrainings: false,
      info: '',
    } as CoachInterface);

    expect(user._id).toEqual('userId');
  });

  it('updates a user profile', async () => {
    const user = (await service.updateProfile('userId', {
      avatar: 'avatar',
      skill: Skill.Beginner,
    })) as ClientInterface;
    expect(user.avatar).toEqual('avatar');
    expect(user.skill).toEqual(Skill.Beginner);
  });

  it('toggles a friend', async () => {
    const user = await service.toggleFriend('friendId', 'userId');
    expect(user.friends).toContain('friendId');
  });

  it('returns a list of user friends', async () => {
    const friends = await service.getFriends('userId');
    expect(friends).toContainEqual(
      expect.objectContaining({
        _id: 'userId',
      })
    );
  });
});
