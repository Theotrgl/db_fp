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
            genres: {
              connect: dto.genres.map((genre) => ({ name: genre })),
            },
            platforms: {
              connect: dto.platforms.map((platform) => ({ platform: platform })),
            },
          },
        });

        // const gameGenre = await this.prisma.genre.update({
        //   where: {
        //     name: dto.genres,
        //   },
        //   data: {
        //     games: {
        //       connect: {
        //         id: game.id,
        //       },
        //     },
        //   },
        // });

        // const gamePlatform = await this.prisma.platforms.update({
        //   where: {
        //     platform: dto.platforms,
        //   },
        //   data: {
        //     game: {
        //       connect: {
        //         id: game.id,
        //       },
        //     },
        //   },
        // });

        return { message:'Game created successfully' };
  
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
            id: Number(id),
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

    async createSales(id : number, discount : number){
      try {
        const game = await this.prisma.on_sale.create({
          data: {
            game : { connect : { id: Number(id), }},
            discount : Number(discount)
          }
      })
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) 
      
      throw error;
    }

    return { message: 'Create sales',}
  }

    async getSales() {
      const sales = await this.prisma.on_sale.findMany({
        include: {
          game: {
            include : {
              genres: true
            }
          }
        }
    });

      return sales;
    }

    async updateGame(dto: GameDto, id : number) {
      try {
        const game = await this.prisma.game.update({
          where: {
            id: Number(id),
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
            id: Number(id),
          },
          include: {
            genres: true,
            platforms: true
          }
        })
        
        return game;
  
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
        const game = await this.prisma.game.findMany({
          include: {
            genres: true,
            platforms: true,
          }
        });
        return game;
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        
        throw error;
      }
    }

    async getAllGamesGenre(genre : string) {
      try {
        const game = await this.prisma.game.findMany(
          {
            where: {
              genres: {
                some: {
                  name: String(genre),
                },
              },
          }
        }
        );
        return game;
  
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) 
        
        throw error;
      }
    }

    async getAllGamesPlatform(platform : string) {
      try {
        const game = await this.prisma.game.findMany(
          {
            where: {
              platforms: {
                some: {
                  platform: String(platform),
                },
              },
          }
        }
        );
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
  