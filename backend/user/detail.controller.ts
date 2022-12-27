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
  
  @Controller('users')
  export class UserController {
    constructor(private userService: UserService) {}

    @Post('addGame')
    addGame(@Body('id') userId: number, @Body('game') game_id: number) {
      console.log(userId);
      return this.userService.AddGame(userId, game_id);
    }

    @Post('transaction')
    transaction(@GetUser('id') userId: number, game_id: number, payment_method: string) {
      return this.userService.transaction(userId, game_id ,payment_method);
    }

    @Post('addPaymentMethod')
    addPaymentMethod(@Body('id') userId: number, @Body('pay') payment_method: string) {
      return this.userService.addPaymentMethod(userId, payment_method);
    }

    @Get('me')
    getMe(@GetUser() user: user) {
      return user;
    }

    @Get('games')
    getGames(@Body('id') userId: number) {
      return this.userService.getGames(userId);
    }
  
    @Patch('update')
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto, ) {
      return this.userService.editUser(userId, dto);
    }
  }
  