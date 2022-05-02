import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createAccountDto } from 'src/DTO/createAccount.dto';
import { Account } from 'src/Entities/Account';
import { Repository } from 'typeorm';

const bcrypt = require('bcryptjs');

@Injectable()
export class AdminLoginService {
    constructor(
        @InjectRepository(Account) private userRepo: Repository<Account>,
    ) {}

    async validUser(username: string, password: string) {
        const find_user = await this.userRepo.findOne({
        where: {
                user_Name: username
            },
        });
        console.log(find_user);
        
        if(!find_user) return null;

        const res = bcrypt.compareSync(password, find_user.password);
        if(res == false) return null;
        return find_user;
    }

    registerUser(user: createAccountDto){
        console.log(user);
        user.password = this.hashPassword(user.password)
        this.userRepo.create(user)
        return this.userRepo.save(user)
    }

    hashPassword(password: string): string {
        const hash = bcrypt.hashSync(password, 10);
        return hash;
    }
    
    get_All_Users(): Promise<Account[]> {
        return this.userRepo.find();
    }

    async is_Exists(user_name: string): Promise<Boolean> {
        const users = await this.userRepo.find()
        const exists = await users.find(user => user.user_Name === user_name)
        return (!!exists);
    }
}
