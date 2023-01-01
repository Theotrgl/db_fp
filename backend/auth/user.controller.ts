import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
  } from '@nestjs/common';
  import { AuthService } from './user.service';
  import { AuthDto } from '../dto/auth.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('signup')
    signup(@Body() dto: AuthDto) {
      console.log(dto);
      return this.authService.signup(dto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body('user') user : string, @Body('password') password : string) {
      return this.authService.signin(user, password);
    }

    @Post('refresh')
    refresh(@Body('token') token : string) {
      return this.authService.refresh(token);
    }

  }