import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateShippingDTO } from 'src/dto/create-shipping.dto';
import { GetShippingsFilterDTO } from 'src/dto/get_shipping_filter.dto';
import { ShippingStatusValidationpipe } from 'src/pipes/task-status-validation.dto';
import { Ship } from './shipping.entity';
import { ShippingService } from './shipping.service';
import { ShippingStatus } from './shipping.status.enum';

@Controller('shipping')
export class ShippingController {
    constructor (private shippingService : ShippingService) {}

    @Get()
    getShippings(@Query(ValidationPipe) filterDTO : GetShippingsFilterDTO)  {
        return this.shippingService.getShippings(filterDTO);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createShipping(@Body() createShippingDTO : CreateShippingDTO) : Promise<Ship>{
        return this.shippingService.createShipping(createShippingDTO)
    }

    @Get('/:id')
    getShippingById(@Param('id', ParseIntPipe) id : number) : Promise<Ship> {
        return this.shippingService.getShippingById(id)
    }
 
    @Delete('/:id')
    deleteShipping(@Param('id', ParseIntPipe) id : number) : Promise<void> {
        return this.shippingService.deleteShipping(id);
    }

    @Patch('/:id')
    updateShipping(@Param('id', ParseIntPipe) id : number, @Body('status', ShippingStatusValidationpipe) status : ShippingStatus) : Promise <Ship> {
        return this.shippingService.updateShipping(id, status);
    }
    
}
