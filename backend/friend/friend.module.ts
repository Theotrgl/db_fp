import { Module } from '@nestjs/common';
import { friendController } from './friend.controller';
import { friendService } from './friend.service';

@Module({
  imports: [],
  controllers: [friendController],
  providers: [friendService],
})
export class FriendModule {}
