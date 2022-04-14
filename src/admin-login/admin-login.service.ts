import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/Entities/Account';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdminLoginService {
    constructor(
        @InjectRepository(Account) private readonly accountRepo: Repository<Account>,
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
  
    async login(user: any) {
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
