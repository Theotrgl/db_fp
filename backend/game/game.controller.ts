import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
  } from '@nestjs/common';
  import { GameService } from './game.service';
  import { GameDto } from '../dto/game.dto';
  
  @Controller('game')
  export class GameController {
    constructor(private gameService: GameService) {}
  
    @Post('create')
    create(@Body() dto: GameDto) {
      console.log(dto);
      return this.gameService.createGame(dto);
    }
  
    @Post('delete')
    delete(@Body('game') id: number) {
      return this.gameService.deleteGame(id);
    }

    @Post('update')
    update(@Body() dto: GameDto, id: number) {
      return this.gameService.updateGame(dto, id);
    }

    @Get('me')
    getMe(id : number) {
      return this.gameService.getGame(id);
    } 

    @Get('allgenre')
    allGenre(@Body('genre') genre: string) {
      return this.gameService.getAllGamesGenre(genre);
    }

    @Get('allplatform')
    allPlatform(@Body('platform') platform: string) {
      return this.gameService.getAllGamesPlatform(platform);
    }

    @Get('all')
    all() {
      return this.gameService.getAllGames();
    }
  }