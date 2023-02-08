import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Ship } from "src/shipping/shipping.entity";

export const TypeOrmConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5433,
    username : 'postgres',
    password : 'admin',
    database : 'taskmanager',
    entities : [Ship, User], 
    synchronize : true,
}