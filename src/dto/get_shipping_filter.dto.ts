import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { ShippingStatus } from "src/shipping/shipping.status.enum";

export class GetShippingsFilterDTO{
    @IsOptional()
    @IsIn([ShippingStatus.SENT, ShippingStatus.IN_PROGRESS, ShippingStatus.DELIVERED])
    status : ShippingStatus;

    @IsOptional()
    @IsNotEmpty()
    search : string;
}