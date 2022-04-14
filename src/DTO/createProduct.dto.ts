import {
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Type } from './../Entities/Type';


export class createProductDto {
    @IsNotEmpty()
    product_name: string;

    @IsString()
    brand: string;

    @IsString()
    describe: string;
    
    @IsNotEmpty()
    category: Type;
    
    @IsNotEmpty()
    in_stock: number;
    
    @IsNotEmpty()
    price: number;

    import_date: Date;
    
    @IsString()
    unit: string;
}