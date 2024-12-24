import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FavoritesModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
