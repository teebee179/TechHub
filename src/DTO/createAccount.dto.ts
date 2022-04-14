import { IsNotEmpty } from "class-validator";

export class createAccountDto {
    @IsNotEmpty()
    user_Name: string;

    @IsNotEmpty()
    password: string;
}