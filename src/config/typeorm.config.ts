import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Ship } from "src/shipping/shipping.entity";
import * as config from 'config';

const dbConfig = config.get('db');
export const TypeOrmConfig : TypeOrmModuleOptions = {
    type : dbConfig.type,
    host : process.env.RDS_HOSTNAME || dbConfig.host,
    port : process.env.RDS_PORT || dbConfig.port,
    username : process.env.RDS_USERNAME || dbConfig.username,
    password : process.env.RDS_PASSWORD || dbConfig.password,
    database : process.env.RDS_DATABASE || dbConfig.database,
    entities : [Ship, User], 
    synchronize : process.env.TYPEORM_SYNC || dbConfig.synchronize,
}