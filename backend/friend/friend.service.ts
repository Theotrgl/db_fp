import { ForbiddenException, Get, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { friendDto } from "../dto/friend.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ConfigService } from "@nestjs/config";
import { create } from "domain";

@Injectable()
export class friendService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async getUserByUsername(username: string) {
    try {
      const users = await this.prisma.user.findMany({
        where: { username: { contains: username } },
        select: {
          id: true,
          username: true,
          avatar: true,
          friends: true,
          symmetricfriends: true,
        },
      });
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addFriend(dto: friendDto) {
    try {
      const friend = await this.prisma.friend_list.create({
        data: {
          a_id: Number(dto.a_id),
          b_id: Number(dto.b_id),
          accepted: Boolean(Number(dto.accepted)),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) throw error;
    }

    return { message: "Done" };
  }

  async deleteFriend(id: number) {
    console.log(Number(id));
    try {
      const friend = await this.prisma.friend_list.deleteMany({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) throw error;
    }
  }

  async updateFriend(dto: friendDto, id: number) {
    try {
      const friend = await this.prisma.friend_list.update({
        where: {
          id: Number(id),
        },
        data: {
          accepted: Boolean(Number(dto.accepted)),
        },
      });
      return { message: "Done" };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) throw error;
    }
  }

  async getFriendState(a_id: number, b_id: number) {
    try {
      const friend = await this.prisma.friend_list.findFirst({
        where: {
          a_id: a_id,
          b_id: b_id,
        },
      });

      return friend.accepted;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) throw error;
    }
  }
}
