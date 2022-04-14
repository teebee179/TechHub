import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { createUserDto } from 'src/DTO/createUser.dto';
import { User } from 'src/Entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const bcrypt = require('bcryptjs');
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GoogleLoginService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }


  async findBy(criteria: any): Promise<User[]> {
    return this.userRepo.find(criteria);
  }

  async store(data: createUserDto) {
    if ((await this.userRepo.findAndCount({ user_email: data.user_email }))[1] > 0)
      throw new BadRequestException("User already exists");
    const user = new User();

    // WARNING: In this case password is stored as PLAINTEXT
    // It is only for show how it works!!!
    Object.assign(user, data);

    return this.userRepo.save(user);
  }
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = (
      await this.findBy({ where: [{ email: username }] })
    )[0];
    if (user && user.user_password === password) return user;
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(
        {

          email: user.user_email,
        },
        {
          secret: 'secretKey',
          expiresIn: 3600,
        }
      ),
    };
  }

  async signInWithGoogle(data) {
    if (!data.user) throw new BadRequestException();

    let user = (
      await this.findBy({ where: [{ user_username: data.user.email }] })
    )[0];
    if (user) return this.login(user);

    user = (
      await this.findBy({ where: [{ user_email: data.user.email }] })
    )[0];
    if (user)
      throw new ForbiddenException(
        "User already exists, but Google account was not connected to user's account"
      );

    try {
      const newUser = new User();
      newUser.user_username = data.user.email;
      newUser.user_fullname = data.user.lastName + data.user.firstName;
      newUser.user_email = data.user.email;
      newUser.user_id = data.user.id;

      await this.store(newUser);
      return this.login(newUser);
    } catch (e) {
      throw new Error(e);
    }
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
}
