import { Injectable } from '@nestjs/common';
import { PayDto } from 'dto/pay.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';
import { AuthDto } from 'dto/auth.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    userName: string,
    password: string
  ) {

    console.log(userName)
    const hash = await argon.hash(password);
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: String(userName),
        hash: String(hash),
      },
    });

    delete user.hash;

    return user;
  }

  async addPaymentMethod (user : any, card_number : string, expiration_date : string, description : string) {
    const pay = await this.prisma.payment_method.create({
      data: {
        description: String(description),
        card_number: String(card_number),
        expiration_date: String(expiration_date),
        user: {
          connect: { id: Number( user.id ) },    
        }
      }
    })

    return { message: "Payment method added" };
  };

  async AddGame(user : any, game_id: number) {
    console.log(user);
    const game = await this.prisma.game.update({
      where: {
        id: Number(game_id),
      },
      data: {
        user: {
          connect: 
            {
              id: Number(user.id), 
            }
    }}});

    return { message: "Game added" };
  };

  async removeGame(user : any, game_id: number) {
    const game = await this.prisma.game.update({
      where: {
        id: Number(game_id),
      },
      data: {
        user: {
          disconnect:
            {
              id: Number(user.id),
            }
    }}});
    return { message: "Game removed" };
  };

  async addRating(userId: number, game_id: number, rating: number, comment: string) {
    if (comment === ""){
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ratings: {
          create: {
            game_id: Number(game_id),
            rating: Number(rating),
          }
        }
      }
    });
  }
  else{
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ratings: {
          create: {
            game_id: Number(game_id),
            rating: Number(rating),
            comment: String(comment),
          }
        }
      }
    });
   }

    return { message: "Rating added" };
  };

  async removeRating(userId: number, game_id: number) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ratings: {
          deleteMany: {
            game_id: Number(game_id),
          }
        }
      }
    });

    return { message: "Rating removed" };
  };

  async getRatings(userId: number) {
    const userRatings =  this.prisma.ratings.findMany({
        where: {
          user: {
            id: Number(userId),
          }
        },
      });

      return userRatings;
    };


  async addTransaction(userId: number, game_id: number, payment_method: string) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        transactions: {
          create: {
            game_id: Number(game_id),
            payment_method_id : String(payment_method),
          }
        }
      }
    });

    return { message: "Transaction added" };
  };

  async addToCart(userId: number, game_id: number) {
    const validate = await this.prisma.cart.findMany({
      where: {
          user_id: Number(userId),
        }
    })

    for(let i = 0; i < validate.length; i++) {
      if(validate[i].game_id === Number(game_id)) {
        return { message : "Already added to cart" };
      }
    }

    const user = await this.prisma.cart.create({
      data: {
        user:{ connect : { id : Number(userId)}},
        game:{ connect : { id : Number(game_id)}},
          }
    });

    return { message: "Game added to cart" };
  };

  async removeFromCart(userId: number, game_id: number) {
    const user = await this.prisma.cart.deleteMany({
      where: {
        user_id: Number(userId),
        game_id: Number(game_id),
      }
    });

    return { message: "Game removed from cart" };
  };

  async getCart(userId: number) {
    const userCart =  this.prisma.cart.findMany({
        where: {
          user: {
            id: Number(userId),
          }
        },
      });

      return userCart;
    };


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

  async getPaymentMethods(user: any) {
    const userPaymentMethods =  this.prisma.payment_method.findMany({
        where: {
          user: {
            id: Number(user),
          }
        },
      });

    return userPaymentMethods;

  }

  async getTransactions(user: any) {
    const userTransactions =  this.prisma.transactions.findMany({
        where: {
          user: {
            id: Number(user),
          }
        },
        include: {
          game: true
        }
      });

    return userTransactions;

  }

  async getFriendList(user : any) {
    try {
      const friend = await this.prisma.friend_list.findMany({
        where: {
          a_id: Number(user.id),
          accepted: true
        },
        include: {
          b: true
        }
      });

      return friend;
 
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) 
      throw error;
    }
  }

  async getFriendRequest(user : any) {
    try {
      const friend = await this.prisma.friend_list.findMany({
        where: {
          a_id: Number(user.id),
          accepted: false
        },
      });

      return friend;

    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) 
      throw error;
    }
  }

}
