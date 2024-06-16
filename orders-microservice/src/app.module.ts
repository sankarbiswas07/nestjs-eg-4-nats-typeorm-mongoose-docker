import { Module } from '@nestjs/common';
import { UsersModule } from './UserProductOrders/user-product-orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProductOrderPayment } from './typeorm/entities/UserProductOrder';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'nestjs_db',
      entities: [UserProductOrderPayment],
      synchronize: true,
      username: 'testuser',
      password: 'test_123',

    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
