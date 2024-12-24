import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find(@GetUser('userId') userId: User['id']) {
    return await this.usersService.findById(userId);
  }

  @Get('current-user')
  async getCurrentUser(
    @GetUser() user: { userId: User['id']; email: User['email'] },
  ) {
    return user;
  }

  @Patch()
  async update(
    @GetUser('userId') userId: User['id'],
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  async delete(@GetUser('userId') userId: User['id']) {
    return await this.usersService.delete(userId);
  }
}
