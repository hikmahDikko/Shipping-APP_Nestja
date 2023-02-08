import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ShippingStatus } from "../shipping/shipping.status.enum";

export class  ShippingStatusValidationpipe implements PipeTransform{
    readonly allowedStatus =[
        ShippingStatus.SENT,
        ShippingStatus.IN_PROGRESS,
        ShippingStatus.DELIVERED
    ];

    transform(value : any) {
        value = value.toUpperCase();
        
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        
        return value;
    }

    private isStatusValid(status : any) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}