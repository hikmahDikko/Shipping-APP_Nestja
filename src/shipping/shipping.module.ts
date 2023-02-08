import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from './shipping.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Ship])
  ],
  providers: [ShippingService],
  controllers: [ShippingController]
})
export class ShippingModule {}
