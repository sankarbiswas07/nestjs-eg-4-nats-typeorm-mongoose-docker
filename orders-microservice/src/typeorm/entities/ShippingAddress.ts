import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'shipping-addresses' })
export class ShippingAddress {

    @PrimaryColumn({ nullable: false })
    id: string; // mongo-id from user-service

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    line_1: string;

    @Column({ nullable: true })
    landmark?: string;

    @Column({ nullable: false })
    state: string;

    @Column({ nullable: false })
    zip: string;
}