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

  async addPaymentMethod (userId: number, payment_method: string) {
    const pay = await this.prisma.payment_method.create({
      data: {
        description: String(payment_method),
        card_number: String(),
        expiration_date: String(1234),
        user: {
          connect: { id: Number(1) },    
        }
      }
    })

    return { message: "Payment method added" };
  };

  async AddGame(userId: number, game_id: number) {
    const user = await this.prisma.game.update({
      where: {
        id: Number(game_id),
      },
      data: {
        user: {
          connect: 
            {
              id: Number(userId), 
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
    const userGame =  this.prisma.game.findMany({
        where: {
          user: { 
            some: {
              id: Number(userId),
            }
          }
        },
      });
    
    return userGame;
    
  }
}
