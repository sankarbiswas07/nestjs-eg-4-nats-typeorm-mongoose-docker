import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AddToCartDto, RemoveFromCartDto } from './dto/cart-item.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CartsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private cartKey = (userId: string) => `cart:${userId}`;

  async getCart(userId: string): Promise<any> {
    const cart = await this.cacheManager.get(this.cartKey(userId));
    return cart ? JSON.parse(cart as string) : [];
  }

  async addToCart(userId: string, item: AddToCartDto): Promise<void> {
    const cart = await this.getCart(userId);
    cart.push(item);
    await this.cacheManager.set(this.cartKey(userId), JSON.stringify(cart));
  }

  async removeFromCart(userId: string, item: RemoveFromCartDto): Promise<void> {
    const cart = await this.getCart(userId);
    const updatedCart = cart.filter((i: AddToCartDto) => i.product_sku !== item.product_sku);
    await this.cacheManager.set(this.cartKey(userId), JSON.stringify(updatedCart));
  }

  async deleteCart(userId: string): Promise<void> {
    await this.cacheManager.del(this.cartKey(userId));
  }
}
