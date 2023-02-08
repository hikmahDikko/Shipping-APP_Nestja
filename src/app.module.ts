import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { ShippingModule } from './shipping/shipping.module';


@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), ShippingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
