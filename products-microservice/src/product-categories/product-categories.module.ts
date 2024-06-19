import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategoriesMicroServiceController } from './product-categories.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ProductCategoryService } from './product-categories.service';
import {Product, ProductSchema} from '../schemas/Product.schema'

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    NatsClientModule
  ],
  controllers: [ProductCategoriesMicroServiceController],
  providers: [ProductCategoryService],
})
export class ProductsModule {}
