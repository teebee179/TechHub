import { Module } from '@nestjs/common';
import { GoogleLoginService } from './google-login.service';
import { GoogleLoginController } from './google-login.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import entities from 'src/Entities/All_Entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService, JwtModule } from "@nestjs/jwt";
import {ConfigModule, ConfigService} from '@nestjs/config'
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
  imports: [TypeOrmModule.forFeature(entities),  JwtModule.register({
    secret: 'secretKey',
    signOptions: {expiresIn: '60s'},
  })],
  controllers: [GoogleLoginController],
  providers: [GoogleLoginService, GoogleStrategy, JwtStrategy]
})

export class GoogleLoginModule {}
