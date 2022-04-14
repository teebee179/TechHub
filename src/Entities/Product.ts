import { Column, Entity, OneToOne, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { Type } from "./Type";

@Entity()
export class Product{
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    product_name: string;

    @Column({
        nullable: false,
        default: '',
    })
    brand: string;

    @Column({
        nullable: false,
        default: '',
    })
    link_img: string;

    @Column({
        nullable: false,
        default: 0,
    })
    rating: number;

    @Column({
        nullable: true,
        default: '',
    })
    describe: string;

    @ManyToOne(type => Type, product => product.type_name )
    category: Type


    @Column({
        nullable: false,
        default: 0,
    })
    in_stock: number;

    @Column({
        type: 'float',
        default: 0,
    })
    price: number;

    
    @Column({
        nullable: true,
        type: Date,
    })
    import_date: Date;

    @Column({
        nullable: false,
        default: 'Package',
    })
    unit: string;
}