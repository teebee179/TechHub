import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
  } from 'class-validator';

export class createUserDto {
    @IsNotEmpty()
    @IsString()
    user_username : string

    @IsNotEmpty()
    @IsString()
    user_email: string

    @IsNotEmpty()
    user_password:string

    @IsNotEmpty()
    @IsString()
    user_fullname: string

    user_address: string;

    @IsPhoneNumber()
    user_tel: string;
}