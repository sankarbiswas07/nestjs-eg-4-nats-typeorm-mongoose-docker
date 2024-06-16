import { OrderPaymentStatus } from "src/utils/type-helper";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'user-product-order-payments' })
export class UserProductOrderPayment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    order_id: string;

    @Column({ nullable: false })
    user_id: string;

    @Column({ nullable: false })
    price: number;

    @Column({
        type: 'enum',
        enum: OrderPaymentStatus, // Replace with your enum type name
        default: OrderPaymentStatus.PENDING, // Set a default status
    })
    status: OrderPaymentStatus;
}