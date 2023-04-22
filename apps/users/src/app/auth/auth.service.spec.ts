import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { RegisterInterface, UserInterface } from '@fit-friends/shared-types';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const user = {
      passwordHash:
        '$2b$10$GvGg7VNY.NQ1D.T4w.6XDOIoFydEekHHxs8JtL/K4f6gWFRsoNYxK',
      refreshTokenHash:
        '$2b$10$J1uQ8PWW2L3aVTHopDBw0.LL/HFrjm0hmbx/mvpQVcHv5J6djfRt2',
    } as unknown as UserInterface;

    const fakeUserRepository: Partial<UserRepository> = {
      create: (entity: UserEntity) =>
        Promise.resolve({ _id: 'userId', ...entity }),
      destroy: () => Promise.resolve(),
      findById: (id: string) => Promise.resolve({ ...user, _id: id }),
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

    const fakeConfigService: Partial<ConfigService> = {
      get: (key) => {
        const keys = {
          'jwt.accessTokenSecret': 'secret',
        };
        return keys[key];
      },
    };

    const fakeJwtService: Partial<JwtService> = {
      signAsync: () => Promise.resolve('token'),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: fakeUserRepository,
        },
        {
          provide: ConfigService,
          useValue: fakeConfigService,
        },
        {
          provide: JwtService,
          useValue: fakeJwtService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('registers a new user', async () => {
    const tokens = await service.register({
      email: 'example@example.com',
      password: '1234546',
    } as RegisterInterface);

    expect(tokens).toEqual({ accessToken: 'token', refreshToken: 'token' });
  });

  it('verifies a user', async () => {
    const entity = await service.verify({
      email: 'example@example.com',
      password: '123456',
    });

    expect(entity.email).toEqual('example@example.com');
  });

  it('logins a user', async () => {
    const tokens = await service.login({
      email: 'example@example.com',
      password: '123456',
    });

    expect(tokens).toEqual({ accessToken: 'token', refreshToken: 'token' });
  });

  it('generates fresh tokens', async () => {
    const tokens = await service.refreshTokens(
      'userId',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDEzMWYzMjVkNmNiZTc2OWRjNDZlYmQiLCJlbWFpbCI6ImxpZGlhLmNhc2hAZXhhbXBsZS5jb20iLCJuYW1lIjoi0JbQsNC90L3QsCIsInJvbGUiOiJDbGllbnQiLCJpYXQiOjE2ODAxODI3MzEsImV4cCI6MTY4MDc4NzUzMX0.MUFjf54I87Llf_78cnm0Wr7Eihx6-ELMYl0dNYTHG70'
    );

    expect(tokens).toEqual({ accessToken: 'token', refreshToken: 'token' });
  });

  it('checks an email', async () => {
    const user = await service.checkEmail('example@example.com');
    expect(user.email).toEqual('example@example.com');
  });

  it('gets a user by id ', async () => {
    const user = await service.getUser('userId');
    expect(user._id).toEqual('userId');
  });
});
