import { Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { CartsModule } from './my-carts/carts.module';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://:new_password@redis:6379',
      isGlobal: true, // Make cache globally available
      // Additional options
      // ttl: 600, // Time to live in seconds
      // max: 100, // Maximum number of items in cache
      // Retry strategy or other options can also be added here
    }),
    CartsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
