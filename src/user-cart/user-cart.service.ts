import { createCartDto } from './../DTO/createCart.dto';
import { User } from 'src/Entities/User';
import { Product } from 'src/Entities/Product';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from 'src/Entities/Cart';

@Injectable()
export class UserCartService {
    constructor (
        @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    ) {}

    get_All_Cart(): Promise<Cart[]> {
        return this.cartRepo.find();
    }

    async get_One_By_Id(id: number): Promise<Cart> {
        try {
            return await this.cartRepo.findOneOrFail(
                {
                    where: {
                        user_id: id,                      
                    }
                }
            )
        } catch (err){
            return null;
        }
    }

    async create_Cart(cartDto: createCartDto){
        const new_Cart = await this.cartRepo.create(cartDto);
        return this.cartRepo.save(new_Cart);
    }

    async delete_By_Id(id: number): Promise<Cart> {
        const cur = await this.get_One_By_Id(id);
        return await this.cartRepo.remove(cur);

    }
    async update_Cart(cartDto: createCartDto, id: number) {
        await this.delete_By_Id(id);
        const cart = await this.create_Cart(cartDto);
        cart.user_id = id;
        return this.cartRepo.save(cart);
    }

}
