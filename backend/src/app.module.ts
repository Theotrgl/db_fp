import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from 'user/detail.module';
import { GameModule } from 'game/game.module';
import { FriendModule } from 'friend/friend.module';
import { GenreModule } from 'genre/genre.module';
import { PlatformModule } from 'platform/platform.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    GameModule,
    FriendModule,
    GenreModule,
    PlatformModule
  ],
})
export class AppModule {}
