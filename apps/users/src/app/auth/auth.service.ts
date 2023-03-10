import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../user/user.repository';
import { LoginDto, RegisterDto } from './dto';
import { UserEntity } from '../user/user.entity';
import { AuthError } from './auth.contstants';
import { UserInterface } from '@fit-friends/shared-types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const { name, email, password, gender, birthday, role, location } = dto;
    const userData = {
      name,
      email,
      gender,
      role,
      location,
      birthday: new Date(birthday),
      passwordHash: '',
    };
    const entity = await new UserEntity(userData).setPassword(password);
    return await this.userRepository.create(entity);
  }

  async verify(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(AuthError.WRONG_CREDENTIALS);
    }

    const entity = new UserEntity(user);

    if (!(await entity.comparePasswords(password))) {
      throw new UnauthorizedException(AuthError.WRONG_CREDENTIALS);
    }

    return entity.toObject();
  }

  async get(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    return user;
  }

  public async login(user: UserInterface) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
