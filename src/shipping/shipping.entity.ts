import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(type => User, user => user.shippings, { eager : false })
    user : User;

    @Column()
    userId : number;
}