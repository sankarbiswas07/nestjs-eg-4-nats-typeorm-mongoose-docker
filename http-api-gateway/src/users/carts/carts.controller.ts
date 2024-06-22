import { Controller, Inject, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';
import { UserCartDto } from './dto/user-cart.dto';
import { AsyncWrapper } from 'src/utils/async-wrapper.decorator';

@Controller('carts')
export class CartsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('add')
  @AsyncWrapper()
  async addToMyCart(@Body() data: { userId: string; item: AddToCartDto }) {
    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'addToMyCart' }, data)
    );
    return response;
  }

  @Post('remove')
  @AsyncWrapper()
  async removeFromMyCart(@Body() data: { userId: string; item: RemoveFromCartDto }) {
    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'removeFromMyCart' }, data)
    );
    return response;
  }

  @Get(':userId')
  @AsyncWrapper()
  async getMyCart(@Param('userId') userId: string) {
    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'getMyCart' }, userId)
    );
    return response;
  }
}
