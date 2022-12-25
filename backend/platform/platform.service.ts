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
  export class PlatformService {
    constructor(
      private prisma: PrismaService,
      private config: ConfigService,
    ) {}
  
    async createPlatform(dto: string) {
      try {
        const game = await this.prisma.platforms.create({
            data: {
                platform: dto,
            }
      });

        
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        
        throw error;
      }
    }

  
  }
  