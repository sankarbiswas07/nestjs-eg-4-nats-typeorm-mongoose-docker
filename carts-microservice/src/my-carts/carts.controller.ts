import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartsService } from './carts.service';
import { AddToCartWithUserDto, RemoveItemFromCartDto } from './dto/cart-item.dto';
import { RpcCatch } from 'src/utils/rpc-exception.decorator';

@Controller()
export class CartsMicroServiceController {
  constructor(private readonly cartService: CartsService) { }

  @MessagePattern({ cmd: 'addToMyCart' })
  @RpcCatch()
  async addToMyCart(@Payload() addToCartWithUserDto: AddToCartWithUserDto) {
    console.log("hi from add to my cart");

    const { userId, ...product } = addToCartWithUserDto

    await this.cartService.addToCart(userId, { ...product, userId });
    return 'Item added to cart';
  }

  @MessagePattern({ cmd: 'removeFromMyCart' })
  @RpcCatch()
  async removeFromMyCart(@Payload() removeItemFromCartDto: RemoveItemFromCartDto) {

    const { userId, product_sku } = removeItemFromCartDto

    await this.cartService.removeFromCart(userId, { product_sku });
    return 'Item removed from cart';
  }

  @MessagePattern({ cmd: 'getMyCart' })
  @RpcCatch()
  async getMyCart(@Payload() userId: string) {
    return await this.cartService.getCart(userId);
  }
}
