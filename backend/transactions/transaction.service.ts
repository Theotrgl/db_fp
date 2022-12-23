import {
    ForbiddenException,
    Get,
    Injectable,
  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionDto } from '../dto/transaction.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';

  @Injectable()
  export class TransactionService {
    constructor(
      private prisma: PrismaService,
      private config: ConfigService,
    ) {}
  
    async createGame(dto: TransactionDto) {
      try {
        const transaction = await this.prisma.transactions.create({
            data: {
                user_id: dto.user_id,
                game_id: dto.game_id,
                payment_method_id: dto.payment_method
            },
            });

        return transaction; 
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          throw new ForbiddenException(e.message);
        }
      }
    }
  }