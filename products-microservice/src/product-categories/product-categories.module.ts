import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategoriesMicroServiceController } from './product-categories.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ProductCategoryService } from './product-categories.service';
import { ProductCategory, ProductCategorySchema } from 'src/schemas/ProductCategory.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: ProductCategory.name,
        schema: ProductCategorySchema,
      },
    ]),
    NatsClientModule
  ],
  controllers: [ProductCategoriesMicroServiceController],
  providers: [ProductCategoryService],
})
export class ProductCategoriesModule {}
