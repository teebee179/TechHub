import { IsNotEmpty } from "class-validator";

export class createCartDto {
    @IsNotEmpty()
    user_id: number;

    products: string

}