import {
    IsNotEmpty,
  } from 'class-validator';
  
  export class friendDto {
    @IsNotEmpty()
    a_id: number;
    
    @IsNotEmpty()
    b_id: number;

    @IsNotEmpty()
    accepted: number;
  }
  