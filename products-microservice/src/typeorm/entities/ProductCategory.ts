import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'product-categories' })
export class ProductCategory {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    description?: string;
}