import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./Product";


@Entity()
export class Type{
    @OneToMany(type => Product, product =>product.category) types: Product[]
    @PrimaryColumn({
        nullable: false, 
        default: 'Unkown',
    })
    type_name: string;

}