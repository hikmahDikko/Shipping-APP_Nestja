import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateShippingDTO } from 'src/dto/create-shipping.dto';
import { GetShippingsFilterDTO } from 'src/dto/get_shipping_filter.dto';
import { ShippingStatusValidationpipe } from 'src/pipes/task-status-validation.dto';
import { Ship } from './shipping.entity';
import { ShippingService } from './shipping.service';
import { ShippingStatus } from './shipping.status.enum';

@Controller('shipping')
@UseGuards(AuthGuard())
export class ShippingController {
    constructor (private shippingService : ShippingService) {}

    @Get()
    getShippings(
        @Query(ValidationPipe) filterDTO : GetShippingsFilterDTO,
        @GetUser() user : User
    )  {
        return this.shippingService.getShippings(filterDTO, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createShipping(
        @Body() createShippingDTO : CreateShippingDTO,
        @GetUser() user : User,
    ) : Promise<Ship>{
        return this.shippingService.createShipping(createShippingDTO, user)
    }

    @Get('/:id')
    getShippingById(
        @Param('id', ParseIntPipe)
        @GetUser() user : User, id : number) : Promise<Ship> {
        return this.shippingService.getShippingById(id, user)
    }
 
    @Delete('/:id')
    deleteShipping(@Param('id', ParseIntPipe) id : number) : Promise<void> {
        return this.shippingService.deleteShipping(id);
    }

    @Patch('/:id')
    updateShipping(
        @Param('id', ParseIntPipe) id : number, 
        @GetUser() user : User,
        @Body('status', ShippingStatusValidationpipe) status : ShippingStatus) : Promise <Ship> {
        return this.shippingService.updateShipping(id, status, user);
    }
    
}
