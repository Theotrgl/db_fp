import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from '../dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          refresh_token: "",
          avatar: "",
          hash,
        },
      });

      const refreshToken = this.signRefreshToken(user.id, user.email);
      const access = this.signToken(user.id, user.email);

      const refresh = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refresh_token: String((await refreshToken).refresh_token),
        },
      });

      return { access_token : (await access).access_token, refresh_token: (await refreshToken).refresh_token} ;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }

    return { message: 'User created successfully'}
  }

  async signin(name, password) {
    // find the user by email
    console.log(name);
    let user =
      await this.prisma.user.findUnique({
        where: {
          email: String(name),
        },
      });
    if (!user) {
      user = await this.prisma.user.findUnique({
        where: {
          username: String(name),
        },
      });
    }
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      String(password),
    );
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    const access = this.signToken(user.id, user.email);

    return { access_token : (await access).access_token, refresh_token: (await user).refresh_token}
  }

  async refresh(refreshToken: string) {
    // Validate the refresh token
    // If the refresh token is valid, generate a new access token
    // Return the new access token
    const options = {secret: 'not-so-secret'}
    const user = await this.prisma.user.findUnique({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (user) {
      if(this.jwt.verify(user.refresh_token, options))
        return this.signToken(user.id, user.email);
    }
    return null;
  }

  async signToken( userId: number, email: string,): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = 'super-secret';

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '1h',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }

  async signRefreshToken( userId: number, email : string): Promise<{ refresh_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = 'not-so-secret';

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '30d',
        secret: secret,
      },
    );

    return {
      refresh_token: token,
    };
  }
}
