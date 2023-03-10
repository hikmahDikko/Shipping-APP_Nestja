import { IsNotEmpty, IsString, MinLength, MaxLength, MATCHES } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    //@MATCHES()
    password : string;
}