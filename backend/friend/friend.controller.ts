import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { friendService } from "./friend.service";
import { friendDto } from "../dto/friend.dto";

@Controller("friend")
export class friendController {
  constructor(private friendService: friendService) {}

  @Get("search")
  getUserByUsername(@Query("username") username: string) {
    return this.friendService.getUserByUsername(username);
  }

  @Post("add")
  addFriend(@Body() dto: friendDto) {
    console.log(dto);
    return this.friendService.addFriend(dto);
  }

  @Post("delete")
  deleteFriend(@Body("id") id: number) {
    return this.friendService.deleteFriend(id);
  }

  @Patch("update")
  updateFriend(@Body() dto: friendDto, @Body("FriendId") id: number) {
    return this.friendService.updateFriend(dto, id);
  }

  @Get("state")
  getFriendState(a_id: number, b_id: number) {
    return this.friendService.getFriendState(a_id, b_id);
  }
}
