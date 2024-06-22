import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartsService } from './carts.service';
import { AddToCartDto, RemoveFromCartDto } from './dto/cart-item.dto';

@Controller()
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @MessagePattern({ cmd: 'addToMyCart' })
  async addToMyCart(@Payload() data: { userId: string; item: AddToCartDto }) {
    await this.cartService.addToCart(data.userId, data.item);
    return 'Item added to cart';
  }

  @MessagePattern({ cmd: 'removeFromMyCart' })
  async removeFromMyCart(@Payload() data: { userId: string; item: RemoveFromCartDto }) {
    await this.cartService.removeFromCart(data.userId, data.item);
    return 'Item removed from cart';
  }

  @MessagePattern({ cmd: 'getMyCart' })
  async getMyCart(@Payload() userId: string) {
    return await this.cartService.getCart(userId);
  }
}
