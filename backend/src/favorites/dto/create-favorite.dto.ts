import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  posterUrl: string;
}
