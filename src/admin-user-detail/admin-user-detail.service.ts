import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/Entities/User';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt = require('bcryptjs');

@Injectable()
export class AdminUserDetailService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}
        
    getUser(id: number) : Promise<User> {
        return this.userRepo.findOne(id);
    }

    async deleteById(id:number){
       await this.userRepo.delete(id);
    }
}