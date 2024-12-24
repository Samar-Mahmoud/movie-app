import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Movie, OmdbSearchResult, SearchResponse } from './movies.types';

@Injectable()
export class MoviesService {
  private apiUrl: string;
  private apiKey: string;

  constructor(configService: ConfigService) {
    this.apiUrl = configService.get('OMDB_API_URL');
    this.apiKey = configService.get('OMDB_API_KEY');
  }

  async search(query: string): Promise<Movie[]> {
    if (!query) {
      throw new BadRequestException('Query parameter is required');
    }

    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          s: query,
          apikey: this.apiKey,
        },
      });
      const data: SearchResponse = await response.data;

      if (data.Response === 'False') {
        throw new BadRequestException(data.Error || 'Error fetching movies');
      }

      return data.Search.map(
        (movie: OmdbSearchResult): Movie => ({
          title: movie.Title,
          year: movie.Year,
          posterUrl: movie.Poster,
        }),
      );
    } catch {
      throw new InternalServerErrorException(
        'Failed to fetch data from OMDb API',
      );
    }
  }
}
