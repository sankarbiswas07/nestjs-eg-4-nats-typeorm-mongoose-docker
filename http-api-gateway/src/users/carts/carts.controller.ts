import { Controller, Inject, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateOrderViaCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';
import { AsyncWrapper } from 'src/utils/async-wrapper.decorator';

@Controller()
export class CartsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('add')
  @AsyncWrapper()
  async addToMyCart(@Body() data:  CreateOrderViaCartDto) {
    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'addToMyCart' }, data)
    );
    console.log(response)
    return response;
  }

  @Post('remove')
  @AsyncWrapper()
  async removeFromMyCart(@Body() data: { user_id: string; item: RemoveFromCartDto }) {
    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'removeFromMyCart' }, data)
    );
    return response;
  }

  @Get(':user_id')
  @AsyncWrapper()
  async getMyCart(@Param('user_id') user_id: string) {
    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'getMyCart' }, user_id)
    );
    return response;
  }
}
