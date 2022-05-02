import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoginService } from './user-login.service';
import { UserLoginController } from './user-login.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import entities from 'src/Entities/All_Entities';
import { LocalStrategy } from 'src/Guards/local.strategy';
import { JwtStrategy } from 'src/Guards/jwt.strategy';
import { SessionSerializer } from 'src/Guards/session.serializer';

@Module({
  imports: [
      PassportModule,
            JwtModule.register({
            secret: 'jwtsecretkey',
            signOptions: {
              expiresIn: '60 seconds',
            },
      }),
      TypeOrmModule.forFeature(entities),
      PassportModule.register({session: true}),
  ],
  controllers: [UserLoginController],
  providers: [UserLoginService,LocalStrategy, JwtStrategy, SessionSerializer],
})
export class UserLoginModule {}
