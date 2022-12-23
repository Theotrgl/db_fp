import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Req,
  } from '@nestjs/common';
  import { friendService } from './friend.service';
  import { friendDto } from '../dto/friend.dto';
  
  @Controller('friend')
  export class friendController {
    constructor(private friendService: friendService) {}

    @Post('add')
    addFriend(@Body() dto: friendDto) {
        console.log(dto);
        return this.friendService.addFriend(dto);
        }

    @Post('delete')
    deleteFriend(@Body() id: number) {
        return this.friendService.deleteFriend(id);
        }

    @Patch('update')
    updateFriend(@Body() dto: friendDto, id: number) {
        return this.friendService.updateFriend(dto, id);
        }

    @Get('state')
    getFriendState(a_id : number, b_id : number) {
        return this.friendService.getFriendState(a_id, b_id);
        }

    @Get('list')
    getFriendList(id : number) {
        return this.friendService.getFriendList(id);
        }
  }