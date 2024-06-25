import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsMicroServiceController } from './products.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ProductService } from './products.service';
import {Product, ProductSchema} from '../schemas/Product.schema'
@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      }
    ]),
    NatsClientModule
  ],
  controllers: [ProductsMicroServiceController],
  providers: [ProductService],
})
export class ProductsModule {}
