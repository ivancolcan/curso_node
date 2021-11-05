import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "_users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    

}
