import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { user } from '@prisma/client';
  import { GetUser } from 'decorator';
  import { JwtGuard } from 'guard/jwt.guard';
  import { EditUserDto } from './dto';
  import { UserService } from './detail.service';
  
  @UseGuards(JwtGuard)
  @Controller('users')
  export class UserController {
    constructor(private userService: UserService) {}

    @Post('addGame')
    addGame(@GetUser('id') userId: number, @Body('game') game_id: number) {
      console.log(game_id);
      return this.userService.AddGame(userId, game_id);
    }

    @Post('transaction')
    transaction(@GetUser('id') userId: number, game_id: number, payment_method: string) {
      return this.userService.transaction(userId, game_id ,payment_method);
    }

    @Get('me')
    getMe(@GetUser() user: user) {
      return user;
    }

    @Get('games')
    getGames(@GetUser('id') userId: number) {
      return this.userService.getGames(userId);
    }
  
    @Patch('update')
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto, ) {
      return this.userService.editUser(userId, dto);
    }
  }
  