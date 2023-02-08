import { IsNotEmpty } from "class-validator";

export class CreateShippingDTO {
    @IsNotEmpty()
    fullName : string;

    @IsNotEmpty()
    address : string;

    @IsNotEmpty()
    phoneNumber : string;
}