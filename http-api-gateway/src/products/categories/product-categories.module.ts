import { Module } from '@nestjs/common';
import { ProductCategoriesController } from './product-categories.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports:[NatsClientModule],
  controllers: [ProductCategoriesController],
  providers: [],
})
export class ProductCategoriesModule {}
