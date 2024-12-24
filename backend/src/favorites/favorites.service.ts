import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteDto, UpdateFavoriteDto } from './dto';
import { FavoriteMovie, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FavoritesService {
  constructor(
    private db: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(userId: User['id'], createFavoriteDto: CreateFavoriteDto) {
    return await this.db.favoriteMovie.create({
      data: {
        userId,
        ...createFavoriteDto,
      },
    });
  }

  async findAll(userId: User['id']) {
    try {
      await this.usersService.findById(userId);
      return await this.db.favoriteMovie.findMany({
        where: {
          userId,
        },
      });
    } catch {
      throw new BadRequestException(`no user with id ${userId}`);
    }
  }

  async update({
    userId,
    id,
    updateFavoriteDto,
  }: {
    userId: User['id'];
    id: FavoriteMovie['id'];
    updateFavoriteDto: UpdateFavoriteDto;
  }) {
    return await this.db.favoriteMovie.update({
      where: {
        id,
        userId,
      },
      data: {
        ...updateFavoriteDto,
      },
    });
  }

  async delete(userId: User['id'], id: FavoriteMovie['id']) {
    const movie = await this.db.favoriteMovie.delete({
      where: {
        id,
        userId,
      },
    });
    if (!movie) {
      throw new NotFoundException('movie not found');
    }
    return movie;
  }
}
