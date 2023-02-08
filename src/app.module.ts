import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ShippingModule } from './shipping/shipping.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), ShippingModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
