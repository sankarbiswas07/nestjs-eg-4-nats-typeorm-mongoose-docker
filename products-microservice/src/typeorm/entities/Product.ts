import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'products' })
export class Product {

    @PrimaryColumn({ nullable: false })
    id: string;

    // SKU stands for “stock keeping unit,” and, as the name suggests, 
    // it is a number (usually eight alphanumeric digits) that 
    // retailers assign to products to keep track of 
    // stock levels internally. If a product has different colors 
    // and sizes, each variation has a unique SKU number
    @Column({ nullable: false, length: 8 })
    product_sku: string;

    @Column({ nullable: false })
    product_name: string;

    @Column({ nullable: true })
    description?: string;

    @Column({nullable: true})
    categories_uuids?: string; // ',' joined uuids from product service

    @Column({ nullable: false })
    mrp: number; // for eg. mrp = max retail price, incl. GST

    @Column({ nullable: false, default: 0, type: 'int' })
    stockQty: number;

    @Column({ nullable: false, default: 'pices' })
    stockType?: string;

    @Column({nullable: true})
    image_urls?: string;
}