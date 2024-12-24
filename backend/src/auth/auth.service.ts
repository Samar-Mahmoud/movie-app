import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { hash, verify } from 'argon2';
import { AuthRetT } from './auth.types';
import { LoginUserDto, CreateUserDto } from '../users/dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<AuthRetT> {
    const { email, password } = createUserDto;

    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('email is duplicated');
    }

    const hashedPassword = await hash(password);
    try {
      const { userId } = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return await this.signToken({ sub: userId, email });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async signin(loginUserDto: LoginUserDto): Promise<AuthRetT> {
    const { email, password } = loginUserDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('email not found');
    }

    const match = await verify(user.password, password);
    if (!match) {
      throw new BadRequestException('wrong credentials');
    }

    return await this.signToken({ sub: user.id, email: user.email });
  }

  private async signToken(payload: {
    sub: User['id'];
    email: User['email'];
  }): Promise<AuthRetT> {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
