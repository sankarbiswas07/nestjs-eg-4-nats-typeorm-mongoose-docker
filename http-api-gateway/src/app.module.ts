import { Module } from '@nestjs/common';
import { UsersModule } from './users/users/users.module';
import { RouterModule } from '@nestjs/core';
import { ProductsModule } from './products/products/products.module';
import { ProductCategoriesModule } from './products/categories/product-categories.module';

@Module({
  imports: [
    UsersModule,
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
