import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
  } from '@nestjs/common';
  import { PlatformService } from './platform.service';
  
  @Controller('platform')
  export class PlatformController {
    constructor(private PlatformService: PlatformService) {}
  
    @Post('create')
    create(@Body('platform') dto) {
      console.log(dto);
      return this.PlatformService.createPlatform(dto);
    }
  }