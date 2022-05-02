import { Injectable } from '@nestjs/common';
import { User } from 'src/Entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}

    async updateUser(id: number, fullname: string, email: string, telephonenum: string, address: string): Promise<User> {
        const updatedUser = this.userRepo.findOne({user_id: id});
        (await updatedUser).user_fullname = fullname;
        (await updatedUser).user_email = email;
        (await updatedUser).user_address = address;
        (await updatedUser).user_tel = telephonenum;
        
        await this.userRepo.update(id, {
            ...((await updatedUser).user_fullname && { user_fullname: (await updatedUser).user_fullname }),
            ...((await updatedUser).user_email && { user_email: (await updatedUser).user_email }),
            ...((await updatedUser).user_address && { user_address: (await updatedUser).user_address }),
            ...(((await updatedUser).user_tel && {user_tel: (await updatedUser).user_tel}))
          });
      
        return this.userRepo.findOne({user_id: id});

    }

    async is_Exists(email: string, currEmail: string): Promise<Boolean> {
        
        const exists = await this.userRepo.findOne({user_email: email});
        if(exists){
            if(currEmail == exists.user_email){
                return (!exists);
            }
            
        }
        
        return (!!exists);
    }

    hashPassword(password: string): string {
        const hash = bcrypt.hashSync(password, 10);
        return hash;
    }

    async checkPassword(userID, currPassword, newPassword): Promise<Boolean>{
        const find_user = await this.userRepo.findOne({
            where: {
                      user_id: userID
                  },
              });
              if(!find_user) return false;
      
              const res = bcrypt.compareSync(currPassword, find_user.user_password);
              if(res == false) return false;
              await this.userRepo.update(userID, {
                ...(find_user.user_password && {user_password: this.hashPassword(newPassword)}),
              });
              return true;
          }
    }

