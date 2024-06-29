import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { CartsModule } from './my-carts/carts.module';

@Module({
  imports: [
    CacheModule.registerAsync<CacheModuleOptions>({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'redis', // default value
            port: 6379, // default value
          },
          password: 'new_password',
        });
        return { store };
      },
    }),
    CartsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
