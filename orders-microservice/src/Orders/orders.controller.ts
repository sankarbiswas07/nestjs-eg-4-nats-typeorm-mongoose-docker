import { Controller } from '@nestjs/common';
import {  MessagePattern, Payload } from '@nestjs/microservices';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { GetOrderDto } from './dto/get-order.dto';
import { RpcCatch } from 'src/utils/rpc-exception.decorator';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersMicroserviceController {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  @MessagePattern({ cmd: 'createMyOrder' })
  @RpcCatch()
  async createOrder(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @MessagePattern({ cmd: 'updateMyOrder' })
  @RpcCatch()
  async updateOrder(
    @Payload() id: string, 
    @Payload() updateOrderDto: UpdateOrderDto) {
      return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @MessagePattern({ cmd: 'getMyOrders' })
  @RpcCatch()
  async getOrders(@Payload() getOrdersDto: GetOrdersDto) {
    const { user_id, page, limit } = getOrdersDto;
    return this.ordersService.getOrders(user_id, page, limit);
  }

  @MessagePattern({ cmd: 'getMyOrder' })
  @RpcCatch()
  async getOrder(@Payload() getOrderDto: GetOrderDto) {
    return this.ordersService.getOrder(getOrderDto.id);
  }
}
