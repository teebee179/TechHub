import { Module } from '@nestjs/common';
import { AdminLoginService } from './admin-login.service';
import { AdminLoginController } from './admin-login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/Entities/All_Entities';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15s' },
    }),
    PassportModule.register({session: true})
  ],
  controllers: [AdminLoginController],
  providers: [AdminLoginService, LocalStrategy, JwtStrategy, SessionSerializer],
  exports: [AdminLoginService]
})
export class AdminLoginModule {}
