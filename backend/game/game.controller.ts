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
  
    @HttpCode(HttpStatus.OK)
    @Post('delete')
    delete(@Body() id: number) {
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

    @Get('all')
    all() {
      return this.gameService.getAllGames();
    }
  }