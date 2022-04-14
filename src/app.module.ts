import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminHomeModule } from './admin-home/admin-home.module';
import { AdminProductModule } from './admin-product/admin-product.module';
import { AdminLoginModule } from './admin-login/admin-login.module';
import { AdminManagementModule } from './admin-management/admin-management.module';
import { AdminUserDetailModule } from './admin-user-detail/admin-user-detail.module';
import { UserProductModule } from './user-product/user-product.module';
import { AdminOrderListModule } from './admin-order-list/admin-order-list.module';
import { UserHomeModule } from './user-home/user-home.module';
import { UserProductDetailModule } from './user-product-detail/user-product-detail.module';
import { UserAboutModule } from './user-about/user-about.module';
import { UserWhyModule } from './user-why/user-why.module';
import { UserCartModule } from './user-cart/user-cart.module';
import { UserTestModule } from './user-test/user-test.module';
import { UserLoginModule } from './user-login/user-login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegisterModule } from './user-register/user-register.module';
import {GoogleLoginModule} from './google-login/google-login.module'
import entities from './Entities/All_Entities';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@Module({
  imports: [
    AdminHomeModule,
    AdminProductModule,
    AdminLoginModule,
    AdminManagementModule,
    AdminUserDetailModule,
    UserProductModule,
    AdminOrderListModule,
    UserHomeModule,
    UserProductDetailModule,
    UserAboutModule,
    UserWhyModule,
    UserCartModule,
    UserTestModule,
    UserLoginModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'users',
      entities: entities,
      synchronize: true,
    }),
    UserRegisterModule,
    GoogleLoginModule,
    UserProfileModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
  
}
