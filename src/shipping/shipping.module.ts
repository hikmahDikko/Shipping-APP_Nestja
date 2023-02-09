import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from './shipping.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Ship]),
    AuthModule
  ],
  providers: [ShippingService],
  controllers: [ShippingController]
})
export class ShippingModule {}
