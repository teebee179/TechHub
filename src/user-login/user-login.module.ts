import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoginService } from './user-login.service';
import { UserLoginController } from './user-login.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import entities from 'src/Entities/All_Entities';

@Module({
  imports: [
      PassportModule,
            JwtModule.register({
            secret: 'jwtsecretkey',
            signOptions: {
              expiresIn: '60 seconds',
            },
      }),
      TypeOrmModule.forFeature(entities)
  ],
  controllers: [UserLoginController],
  providers: [UserLoginService,LocalStrategy, JwtStrategy],
})
export class UserLoginModule {}
