import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
  } from '@nestjs/common';
  import { TransactionService } from './transaction.service';
  import { TransactionDto } from '../dto/transaction.dto';
  
  @Controller('game')
  export class TransactionController {
    constructor(private gameService: TransactionService) {}
  
    @Post('create')
    create(@Body() dto: TransactionDto) {
      console.log(dto);
      return this.gameService.createGame(dto);
    }

  }