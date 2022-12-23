import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  async AddGame(userId: number, game_id: number) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ratings: {
          create: 
            {
              game_id: game_id,
              rating: null,
            }
    }}});
  }

  async transaction(userId: number, game_id: number, payment_method: string) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        transactions: {
          create: {
            game_id: game_id,
            payment_method_id : payment_method,
          }
        }
      }
    });
  } 


  async getGames(userId: number) {
    const user =  this.prisma.ratings.findMany({
        where: {
          user_id: userId,
        },
      });
    
    return user;
    
  }
}
