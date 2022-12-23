import { Module } from '@nestjs/common';
import { UserController } from './detail.controller';
import { UserService } from './detail.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
