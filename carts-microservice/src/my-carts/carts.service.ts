import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AddToCartWithUserDto, Product, ProductSkuInObj } from './dto/cart-item.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CartsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  private cartKey = (userId: string) => `cart:${userId}`;

  async getCart(userId: string): Promise<any> {
    console.log(userId)
    const cart = await this.cacheManager.get(this.cartKey(userId));
    console.log(cart)
    return cart ? JSON.parse(cart as string) : [];
  }

  async addToCart(userId: string, addToCartWithUserDto: AddToCartWithUserDto): Promise<void> {
    const cart = await this.getCart(userId);
    cart.push(addToCartWithUserDto);
    console.log(cart)
    await this.cacheManager.set(this.cartKey(userId), JSON.stringify(cart), 0);
  }

  async removeFromCart(userId: string, item: ProductSkuInObj): Promise<void> {
    const cart = await this.getCart(userId);
    const updatedCart = cart.filter((i: ProductSkuInObj) => i.product_sku !== item.product_sku);
    await this.cacheManager.set(this.cartKey(userId), JSON.stringify(updatedCart));
  }

  async deleteCart(userId: string): Promise<void> {
    await this.cacheManager.del(this.cartKey(userId));
  }
}
