import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CartsService } from './carts.service';
import { AddToCartWithUserDto, RemoveItemFromCartDto } from './dto/cart-item.dto';
import { RpcCatch } from 'src/utils/rpc-exception.decorator';

@Controller()
export class CartsMicroServiceController {
  constructor(private readonly cartService: CartsService) { }

  @MessagePattern({ cmd: 'addToMyCart' })
  @EventPattern('addToMyCart')
  @RpcCatch()
  async addToMyCart(@Payload() addToCartWithUserDto: AddToCartWithUserDto) {
    console.log("hi from add to my cart, skipped from cart : "+ addToCartWithUserDto.skippedCart);

    const { user_id, ...product } = addToCartWithUserDto

    await this.cartService.addToCart(user_id, { ...product, user_id });
    return 'Item added to cart';
  }

  @MessagePattern({ cmd: 'removeFromMyCart' })
  @RpcCatch()
  async removeFromMyCart(@Payload() removeItemFromCartDto: RemoveItemFromCartDto) {

    const { user_id, product_sku } = removeItemFromCartDto

    await this.cartService.removeFromCart(user_id, { product_sku });
    return 'Item removed from cart';
  }

  @MessagePattern({ cmd: 'getMyCart' })
  @RpcCatch()
  async getMyCart(@Payload() user_id: string) {
    return await this.cartService.getCart(user_id);
  }
}
