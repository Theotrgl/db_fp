import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class TransactionDto {
    @IsInt()
    @IsNotEmpty()
    game_id: number;
    
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    invoice_id: string;

    @IsString()
    @IsNotEmpty()
    payment_method: string;
  }
  