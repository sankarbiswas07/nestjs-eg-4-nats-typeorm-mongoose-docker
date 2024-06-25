import { Controller, Post, Body, Get, Param, Patch, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { GetOrderDto } from './dto/get-order.dto';
import { AsyncWrapper } from 'src/utils/async-wrapper.decorator';

@Controller()
export class OrdersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }


  @Post('create')
  @AsyncWrapper()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'createMyOrder' }, createOrderDto)
    );
  }

  @Get(':id')
  @AsyncWrapper()
  async findOne(@Param('id') id: GetOrderDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getMyOrder' }, { id })
    );
  }

  @Get()
  @AsyncWrapper()
  async findAll(@Query() queryOrdersDto: GetOrdersDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'getMyOrders' }, {...queryOrdersDto})
    );
  }

  @Patch(':id')
  @AsyncWrapper()
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await lastValueFrom(
      this.natsClient.send({ cmd: 'updateMyOrder' }, { id, updateOrderDto })
    );
  }
}
