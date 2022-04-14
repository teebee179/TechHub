import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserLoginService } from './user-login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: UserLoginService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.verifyUser(username, password);
    if (user) {
      return user;
    }
    return {};
  }
}