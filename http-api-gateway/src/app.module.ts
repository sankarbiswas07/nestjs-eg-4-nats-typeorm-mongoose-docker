import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { UsersModule } from './users/users/users.module';
import { CartsModule } from './users/carts/carts.module';

import { ProductsModule } from './products/products/products.module';
import { ProductCategoriesModule } from './products/categories/product-categories.module';
import { OrdersModule } from './users/orders/orders.module';
import { AddressesModule } from './users/addresses/addresses.module';

@Module({
  imports: [
    UsersModule,
    CartsModule,
    OrdersModule,
    AddressesModule,
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
        children: [
          {
            path: 'carts',
            module: CartsModule,
          },
          {
            path: 'orders',
            module: OrdersModule,
          },
          {
            path: 'addresses',
            module: AddressesModule,
          },
        ],
      },
    ]),
    ProductsModule,
    ProductCategoriesModule,
    RouterModule.register([
      {
        path: 'products',
        module: ProductsModule,
        children: [
          {
            path: 'categories',
            module: ProductCategoriesModule,
          }
        ],
      },
    ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
