import { Column, Entity, OneToOne, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";


@Entity()
export class Cart{
    @PrimaryColumn({
        nullable: false,
        type: 'bigint',
    })
    user_id: number

    @Column({
        nullable: true,
    })
    products: string
}