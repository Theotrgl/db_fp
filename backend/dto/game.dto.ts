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
    
    @IsNotEmpty()
    images: any;

    @IsString()
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    genres: string[];
    
    @IsNotEmpty()
    platforms: string[];
  }
  