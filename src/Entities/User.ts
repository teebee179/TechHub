import { Column, Entity, OneToOne, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { Cart } from "./Cart";


@Entity()
export class User{
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    user_id : number;

    @Column({
        nullable: false,
    })
    user_username: string;

    @Column({
        nullable: false,
    })
    user_email: string;

    @Column({
        nullable:true,
    })
    user_password: string;

    @Column({
        nullable:false,
        default: '',
    })
    user_fullname: string;

    @Column({
        nullable:true,
        default:'',
    })
    user_address: string;

    @Column({
        nullable:true,
        default:''
    })
    user_tel: string;
}