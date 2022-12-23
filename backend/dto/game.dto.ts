import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class GameDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    developer: string;

    @IsString()
    @IsNotEmpty()
    publisher: string;
    
    @IsString()
    @IsNotEmpty()
    images: any;

    @IsString()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    genres: string;
    
    @IsString()
    @IsNotEmpty()
    platforms: string;
  }
  