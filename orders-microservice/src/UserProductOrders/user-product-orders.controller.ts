import {
  Controller,
  Inject
} from '@nestjs/common';

import {  MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserProductOrderPaymentDto } from './dto/create-user-product-order.dto';
import { UsersService } from './user-product-orders.service';

@Controller()
export class UserProductOrderPaymentMicroServiceController {
  constructor(private usersService: UsersService) { }

  @MessagePattern({ cmd: 'createUserProductOrderPayment' })
  createUser(@Payload() data: CreateUserProductOrderPaymentDto) {
    console.log('-------Create UserProductOrderPaymentDto---------')
    console.log(data);

    return this.usersService
    .createUser(data)
  }
}
