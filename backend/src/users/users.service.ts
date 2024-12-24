import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<{ userId: User['id'] }> {
    const { id: userId } = await this.db.user.create({
      data: {
        ...createUserDto,
      },
      select: {
        id: true,
      },
    });
    return {
      userId,
    };
  }

  async findByEmail(email: User['email']) {
    return await this.db.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findById(id: User['id']) {
    const user = await this.db.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: User['id'], updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const user = await this.findByEmail(updateUserDto.email);
      if (user) {
        throw new BadRequestException('email is already used');
      }
    }
    return await this.db.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async delete(id: User['id']) {
    const user = await this.db.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
