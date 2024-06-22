import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:password@mongo_db:27017/products_management?authSource=admin', {retryAttempts: 3}),
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
