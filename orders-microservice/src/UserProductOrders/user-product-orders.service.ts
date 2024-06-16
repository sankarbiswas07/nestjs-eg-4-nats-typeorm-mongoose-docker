import { Injectable } from "@nestjs/common";
import { UserProductOrderPayment } from "src/typeorm/entities/UserProductOrderPayment";
import { Repository } from "typeorm";
import { CreateUserProductOrderPaymentDto } from "./dto/create-user-product-order.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserProductOrderPaymentsService {

    constructor(
        @InjectRepository(UserProductOrderPayment) private userProductOrderPaymentsRepository: Repository<UserProductOrderPayment>,
    ) { }

    createUserProductOrderPayment(createUserProductOrderPaymentDto: CreateUserProductOrderPaymentDto) {
        const newUserProductOrderPayment = this.userProductOrderPaymentsRepository.create(createUserProductOrderPaymentDto);
        return this.userProductOrderPaymentsRepository.save(newUserProductOrderPayment);
    }


}