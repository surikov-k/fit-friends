import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import {
  JwtPayload,
  LoginInterface,
  RegisterInterface,
  Tokens,
  UserInterface,
} from '@fit-friends/shared-types';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { RpcException } from '@nestjs/microservices';
import { AuthError } from '../app.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterInterface) {
    const {
      name,
      email,
      password,
      gender,
      birthday,
      role,
      location,
      avatar = '',
    } = dto;
    const userData = {
      name,
      email,
      gender,
      role,
      location,
      birthday: birthday ? new Date(birthday) : undefined,
      passwordHash: '',
      rtHash: '',
      avatar,
    };

    const entity = new UserEntity(userData);
    await entity.setPassword(password);
    const user = await this.userRepository.create(entity);
    const tokens = await this.getTokens(this.getJwtPayload(user));
    await entity.setRefreshTokenHash(tokens.refreshToken);
    await this.userRepository.update(user._id, entity);

    return tokens;
  }

  async verify(dto: LoginInterface) {
    const { email, password } = dto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: AuthError.WRONG_CREDENTIALS,
      });
    }

    const entity = new UserEntity(user);

    if (!(await entity.comparePasswords(password))) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: AuthError.WRONG_CREDENTIALS,
      });
    }

    return entity.toObject();
  }

  public async login(dto: LoginInterface) {
    const user = await this.verify(dto);

    const entity = new UserEntity(user);
    const tokens = await this.getTokens(this.getJwtPayload(user));
    await entity.setRefreshTokenHash(tokens.refreshToken);
    await this.userRepository.update(user._id, entity);

    return tokens;
  }

  async logout(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return;
    }
    const entity = new UserEntity(user);
    entity.clearRefreshTokenHash();

    await this.userRepository.update(userId, entity);
  }

  public async getTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.accessTokenSecret'),
        expiresIn: +this.configService.get<number>('jwt.accessTokenExpiresIn'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: +this.configService.get<number>('jwt.refreshTokenExpiresIn'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userRepository.findById(userId);
    const entity = new UserEntity(user);

    if (!user || !user.refreshTokenHash) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: AuthError.WRONG_CREDENTIALS,
      });
    }

    if (!(await entity.compareRefreshToken(refreshToken))) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: AuthError.WRONG_CREDENTIALS,
      });
    }

    const tokens = await this.getTokens(this.getJwtPayload(user));
    await entity.setRefreshTokenHash(tokens.refreshToken);
    await this.userRepository.update(user._id, entity);

    return tokens;
  }

  getJwtPayload({ _id, email, name, role }: UserInterface): JwtPayload {
    return {
      sub: _id.toString(),
      email,
      name,
      role,
    };
  }

  async checkEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async getUser(userId: string) {
    return this.userRepository.findById(userId);
  }
}
