import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async signup(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByNickname(dto.nickname);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPass = await bcrypt.hash(dto.password, 7);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPass,
    });
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { nickname: user.nickname, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByNickname(dto.nickname);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некоректный никнейм или пароль',
    });
  }
}
