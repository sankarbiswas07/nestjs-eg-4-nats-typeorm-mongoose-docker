import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AddToCartWithUserDto, Product, ProductSkuInObj } from './dto/cart-item.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CartsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  private cartKey = (user_id: string) => `cart:${user_id}`;

  async getCart(user_id: string): Promise<any> {
    const cart = await this.cacheManager.get(this.cartKey(user_id));
    console.log(cart)
    return cart ? JSON.parse(cart as string) : [];
  }

  async addToCart(
    user_id: string,
    addToCartWithUserDto: AddToCartWithUserDto
  ): Promise<void> {
    const cart = await this.getCart(user_id);
    cart.push(addToCartWithUserDto);
    console.log(cart)
    await this.cacheManager.set(this.cartKey(user_id), JSON.stringify(cart), 0);
  }

  async removeFromCart(user_id: string, item: ProductSkuInObj): Promise<void> {
    const cart = await this.getCart(user_id);
    const updatedCart = cart.filter((i: ProductSkuInObj) => i.product_sku !== item.product_sku);
    await this.cacheManager.set(this.cartKey(user_id), JSON.stringify(updatedCart));
  }

  async deleteCart(user_id: string): Promise<void> {
    await this.cacheManager.del(this.cartKey(user_id));
  }
}
