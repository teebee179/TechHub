import { Injectable } from '@nestjs/common';
import { createUserDto } from 'src/DTO/createUser.dto';
import { User } from 'src/Entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/Entities/Product';

const bcrypt = require('bcryptjs');

@Injectable()
export class UserLoginService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
    ) {}
  async verifyUser(username: string, password: string) {
    const find_user = await this.userRepo.findOne({
      where: {
                user_username: username
            },
        });
        if(!find_user) return null;

        const res = bcrypt.compareSync(password, find_user.user_password);
        if(res == false) return null;
        return find_user;
    }

    async get_All_Products(offset, limit): Promise<Product[]> {
        const [result, total] = await this.productRepo.findAndCount({
            take: limit, 
            skip: offset
        })
        return result;
    }
}
