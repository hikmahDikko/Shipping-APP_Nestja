import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateShippingDTO } from 'src/dto/create-shipping.dto';
import { GetShippingsFilterDTO } from 'src/dto/get_shipping_filter.dto';
import { ShippingStatusValidationpipe } from 'src/pipes/task-status-validation.dto';
import { Repository     } from 'typeorm';
import { Ship } from './shipping.entity';
import { ShippingStatus } from './shipping.status.enum';

@Injectable()
export class ShippingService {
    constructor(
        @InjectRepository(Ship)
        private shipRepository : Repository<Ship>
    ) {}
    
    async getShippings(filterDTO : GetShippingsFilterDTO, user : User) : Promise<Ship[]> {
        const { status, search } = filterDTO;
        const query = this.shipRepository.createQueryBuilder('ship');

        query.where('ship.userId = :userId', { userId : user.id })

        if(status) {
            query.andWhere('ship.status = :status', {status});
        }

        if(search) {
            query.andWhere('ship.address LIKE :search OR ship.fullName LIKE :search', {search : `%${search}%` })
        }

        const shippings = await query.getMany();

        return shippings;
    }
    

    async getShippingById(id : number, user : User) : Promise<Ship>{
        const found = await this.shipRepository.findOne({where : {id, userId : user.id}});

        if(!found){
            throw new NotFoundException(`Shipping with the "${id}" not found`);
        }

        return found;
    }

    async createShipping(createShippingDTO : CreateShippingDTO, user : User) : Promise <Ship>{
        const { fullName, address, phoneNumber } = createShippingDTO;

        const data = new Ship();

        data.fullName = fullName;
        data.address = address;
        data.phoneNumber = phoneNumber;
        data.user = user;
        data.status = ShippingStatus.SENT;

        await data.save()

        delete data.user;
        return data;
    }

    async deleteShipping(id : number, user : User) : Promise<void>{
        const result = await this.shipRepository.delete({id, userId : user.id});

        if(result.affected === 0) {
            throw new NotFoundException(`Shipping with id ${id} is not found`);
        }
    }

    async updateShipping(id : number, statusUpdate : ShippingStatus, userr : User) : Promise<Ship> {
        const user = await this.getShippingById(id, userr);

        if(!user) {
            throw new NotFoundException(`Shipping with the "${id}" not found`);
        }

        user.status = statusUpdate;
        await user.save();
        return user;
    }
}
