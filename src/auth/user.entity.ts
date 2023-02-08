import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name : "User"})
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    password: string;
}