import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'user-product-orders' })
export class UserProductOrder {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, default: 0, type: 'int' })
    orderQty: number;
}