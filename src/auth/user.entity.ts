import { Ship } from "src/shipping/shipping.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name : "User"})
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    password: string;

    @OneToMany(type => Ship, shipping => shipping.user, { eager : false })
    shippings : User;
}