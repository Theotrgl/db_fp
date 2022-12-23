import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from 'user/detail.module';
import { GameModule } from 'game/game.module';
import { TransactionModule } from 'transactions/transaction.module';
import { FriendModule } from 'friend/friend.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    GameModule,
    TransactionModule,
    FriendModule
  ],
})
export class AppModule {}
