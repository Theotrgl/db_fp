import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class PayDto {
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    card_number: string;

    @IsString()
    @IsNotEmpty()
    expiration_date: string;
  }
  