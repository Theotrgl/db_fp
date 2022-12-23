import {
    ForbiddenException,
    Get,
    Injectable,
  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GameDto } from '../dto/game.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';

  @Injectable()
  export class GameService {
    constructor(
      private prisma: PrismaService,
      private config: ConfigService,
    ) {}
  
    async createGame(dto: GameDto) {
      try {
        const game = await this.prisma.game.create({
          data: {
            title: dto.title,
            description: dto.description,
            developer: dto.developer,
            publisher: dto.publisher,
            images: dto.images,
            price: dto.price,
          },
        });
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        
        throw error;
      }
    }

    async deleteGame(id : number) {
      try {
        const game = await this.prisma.game.delete({
          where: {
            id: id,
          },
        });
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        
        throw error;
      }
    }

    async updateGame(dto: GameDto, id : number) {
      try {
        const game = await this.prisma.game.update({
          where: {
            id: id,
          },
          data: {
            title: dto.title,
            description: dto.description,
            developer: dto.developer,
            publisher: dto.publisher,
            images: dto.images,
            price: dto.price,
          },
        });
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        
        throw error;
      }
    }

    async getGame(id : number) {
      try {
        const game = await this.prisma.game.findUnique({
          where: {
            id: id,
          },
        });
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        
        throw error;
      }
    }

    async getAllGames() {
      try {
        const game = await this.prisma.game.findMany();
        return game;
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        
        throw error;
      }
    }
  
  }
  