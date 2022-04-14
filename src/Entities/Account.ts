import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;
    
    @Column({
        nullable: false,
        default: ''
    })
    user_Name: string;
    
    @Column({
        nullable: false,
        default: '',
    })
    password: string;
}