import { Injectable } from '@nestjs/common';
import { Type } from './../Entities/Type';
import { createProductDto } from './../DTO/createProduct.dto';
import { createTypeDto } from './../DTO/createType.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Entities/Product';
import { Repository } from 'typeorm';


@Injectable()
export class UserProductDetailService {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Type) private typeRepo: Repository<Type>,

    ) {}
    
    async get_All_Products(offset, limit): Promise<Product[]> {
        const [result, total] = await this.productRepo.findAndCount({
            take: limit, 
            skip: offset
        })
        return result;
    }

    async get_One_Product_By_Id(id: number): Promise<Product> {
        try {
            return this.productRepo.findOneOrFail({where: {id: id}});
        } catch (error) {
            //i dont know how to handle this
            throw error;
        }
    }
}
