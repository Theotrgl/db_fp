import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
  } from '@nestjs/common';
  import { GenreService } from './genre.service';
  
  @Controller('genre')
  export class GenreController {
    constructor(private genreService: GenreService) {}
  
    @Post('create')
    create(@Body('genre') dto) {
      console.log(dto);
      return this.genreService.createGenre(dto);
    }
  }