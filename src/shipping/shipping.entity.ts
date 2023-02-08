import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ShippingStatus } from "./shipping.status.enum";

@Entity({name : "Ship"})
export class Ship extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number; 
    
    @Column()
    fullName : string;

    @Column()
    address : string;

    @Column()
    phoneNumber : string;
    
    @Column()
    status : ShippingStatus;
}