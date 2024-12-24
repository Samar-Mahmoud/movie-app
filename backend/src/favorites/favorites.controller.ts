import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteMovie, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../users/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(
    @GetUser('userId') userId: User['id'],
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.favoritesService.create(userId, createFavoriteDto);
  }

  @Get()
  findAll(@GetUser('userId') userId: User['id']) {
    return this.favoritesService.findAll(userId);
  }

  @Patch(':id')
  update(
    @GetUser('userId') userId: User['id'],
    @Param('id') id: FavoriteMovie['id'],
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoritesService.update({ userId, id, updateFavoriteDto });
  }

  @Delete(':id')
  delete(
    @GetUser('userId') userId: User['id'],
    @Param('id') id: FavoriteMovie['id'],
  ) {
    return this.favoritesService.delete(userId, id);
  }
}
