import { Module } from '@nestjs/common';
import { AdminLoginService } from './admin-login.service';
import { AdminLoginController } from './admin-login.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';
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
  controllers: [AdminLoginController],
  providers: [AdminLoginService, JwtStrategy, SessionSerializer]
})
export class AdminLoginModule {}
