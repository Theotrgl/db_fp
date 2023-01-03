import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { GameService } from "./game.service";
import { GameDto } from "../dto/game.dto";

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Post("create")
  create(@Body() dto: GameDto) {
    return this.gameService.createGame(dto);
  }

  @Post("createsale")
  createSales(
    @Body("game") game_id: number,
    @Body("discount") discount: number,
  ) {
    return this.gameService.createSales(game_id, discount);
  }

  @Post("delete")
  delete(@Body("game") id: number) {
    return this.gameService.deleteGame(id);
  }

  @Post("update")
  update(@Body("game") dto: GameDto, id: number) {
    return this.gameService.updateGame(dto, id);
  }

  @Post("getgame")
  getMe(@Body("game") id: number) {
    return this.gameService.getGame(id);
  }

  @Get("allgenre")
  allGenre(@Body("genre") genre: string) {
    return this.gameService.getAllGamesGenre(genre);
  }

  @Get("allplatform")
  allPlatform(@Body("platform") platform: string) {
    return this.gameService.getAllGamesPlatform(platform);
  }

  @Get("all")
  all() {
    return this.gameService.getAllGames();
  }

  @Get("allsales")
  sales() {
    return this.gameService.getSales();
  }

  @Get("search")
  getGameByTitle(@Query("title") title: string) {
    return this.gameService.getGameByTitle(title);
  }
}
