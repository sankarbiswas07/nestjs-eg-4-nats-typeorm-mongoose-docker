import { Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

import { CartsModule } from './my-carts/carts.module';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      // if you use redis
      useFactory: async () => ({
        store: redisStore.redisStore,
        host: "redis",
        password: "new_password",
        port: 6379,
        ttl: 0
      }),
    }),
    CartsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
