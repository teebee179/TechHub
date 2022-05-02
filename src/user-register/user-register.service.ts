import { Injectable } from '@nestjs/common';
import { createUserDto } from 'src/DTO/createUser.dto';
import { User } from 'src/Entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const bcrypt = require('bcryptjs');
@Injectable()
export class UserRegisterService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}

    registerUser(user: createUserDto){
        console.log(user);
        user.user_password = this.hashPassword(user.user_password)
        this.userRepo.create(user)
        return this.userRepo.save(user)
    }

    hashPassword(password: string): string {
        const hash = bcrypt.hashSync(password, 10);
        return hash;
    }

    async is_Exists(user_name: string): Promise<Boolean> {
        const users = await this.userRepo.find()
        const exists = await users.find(user => user.user_username === user_name)
        return (!!exists);
    }
}
