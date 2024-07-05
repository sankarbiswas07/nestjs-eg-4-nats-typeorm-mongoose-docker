import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user-orders' })
export class UserOrders {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Entity: products
    @Column({ nullable: false })
    product_id: string;

    @Column({ nullable: false, length: 8 })
    product_sku: string;

    @Column({ nullable: false })
    product_name: string;

    @Column({ nullable: true })
    description?: string;

    // Array of categories this product belongs to
    @Column({ nullable: true })
    categories_uuids?: string;

    @Column({ nullable: false })
    mrp: number; // for eg. mrp = max retail price, incl. GST

    @Column({ nullable: false, default: 1, type: 'int' })
    order_qty: number;

    @Column({ nullable: true, default: 'pieces' })
    stock_type?: string;

    @Column({ nullable: true })
    image_urls?: string;

    // Entity: user
    @Column({ nullable: false })
    user_id: string;

    @Column({ nullable: false })
    user_name: string;

    @Column({ nullable: true, })
    display_name?: string;

    // Entity: shipping
    @Column({ nullable: false, })
    shipping_id: string

    @Column({ nullable: false, })
    shipping_name: string

    @Column({ nullable: false, })
    shipping_phone: string

    @Column({ nullable: false, })
    shipping_line_1: string

    @Column({ nullable: true, })
    shipping_landmark?: string

    @Column({ nullable: false, })
    shipping_state: string

    @Column({ nullable: false, })
    shipping_zip: string
}